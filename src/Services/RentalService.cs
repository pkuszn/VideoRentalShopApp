using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using VideoRentalStoreApp.DataTransferObjects;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Models;
using static VideoRentalStoreApp.Constants.Enums;

namespace VideoRentalStoreApp.Services;

internal class RentalService : IRentalService
{
    private readonly ILogger<RentalService> Logger;
    private readonly VideoRentalStoreDbContext DbContext;

    public RentalService(VideoRentalStoreDbContext dbContext, ILogger<RentalService> logger)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<UserRentedVideosResults>> GetListOfUserWithRentedVideosAsync()
    {
        return await GetListOfRentsAsync();
    }
    public async Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria)
    {
        return await ReturnRentedVideoBasedOn(criteria.Title, criteria.UserId!);
    }

    public async Task<bool> ReturnRentedVideoByNamesAsync(RentFilmByNamesCriteria criteria)
    {
        return await ReturnRentedVideoBasedOn(criteria.Title, criteria.FirstName!, criteria.LastName!);
    }

    public async Task<bool> RentVideoByNamesAsync(RentFilmByNamesCriteria criteria)
    {
        return await RentVideoAsyncBasedOn(criteria.Title, criteria.FirstName!, criteria.LastName!);
    }

    public async Task<bool> RentVideoByIdAsync(RentFilmByIdCriteria criteria)
    {
        return await RentVideoAsyncBasedOn(criteria.Title, criteria.UserId!);
    }

    private async Task<List<UserRentedVideosResults>> GetListOfRentsAsync()
    {
        List<VideoRental> videoRentals = await DbContext.VideoRentals.ToListAsync();
        if ((videoRentals?.Count ?? 0) == 0)
        {
            Logger.LogInformation($"Video list is null");
            return null!;
        }

        ObjectId[] userIds = videoRentals!.Select(s => s.UserId).ToArray();
        List<User> users = await DbContext.Users.Where(q => userIds.Contains(q.Id)).ToListAsync();
        if ((users?.Count ?? 0) == 0)
        {
            Logger.LogInformation($"User list is null");
            return null!;
        }

        List<UserRentedVideosResults> userRentedVideosResults = [];
        foreach (VideoRental videoRental in videoRentals!)
        {
            User? user = users!.FirstOrDefault(f => f.Id.Equals(videoRental.UserId));
            if (user == null)
            {
                continue;
            }

            foreach (VideoRent video in videoRental.Videos)
            {
                userRentedVideosResults.Add(new UserRentedVideosResults
                {
                    Id = videoRental.Id.ToString(),
                    FirstName = videoRental.FirstName,
                    LastName = videoRental.LastName,
                    Address = user.Address ?? string.Empty,
                    Contact = user.Contact,
                    Title = video.Title,
                    StartRentalDate = video.StartRentalDate,
                    EndRentalDate = video.EndRentalDate,
                    RealEndOfRentalDate = video.RealEndOfRentalDate,
                    RegistrationDate = user.RegistrationDate
                });
            }
        }
        return userRentedVideosResults;
    }

    private async Task<VideoRental> CreateRentalCardAsync(User user)
    {
        if (user == null)
        {
            return null!;
        }
        VideoRental videoRental = new()
        {
            UserId = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Videos = []
        };
        await DbContext.VideoRentals.AddAsync(videoRental);
        await DbContext.SaveChangesAsync();
        return videoRental;
    }

    private async Task<bool> ReturnRentedVideoBasedOn(string videoTitle, string userId)
    {
        User? user = await DbContext.Users.Where(q => q.Id.Equals(new ObjectId(userId))).FirstOrDefaultAsync();
        if (user == null)
        {
            Logger.LogInformation($"User with id: {userId} not exists");
            return false;
        }

        Video? video = await DbContext.Videos.Where(q => q.Title.Equals(videoTitle)).FirstOrDefaultAsync();
        if (video == null)
        {
            Logger.LogInformation($"Video with title: {videoTitle} not exists");
            return false;
        }

        DateTime dateNow = DateTime.UtcNow;
        VideoRental? videoRentalResult = await DbContext.VideoRentals
            .Where(q => q.UserId.Equals(user.Id) &&
                        q.Videos.Any(video => video.Title == videoTitle))
            .FirstOrDefaultAsync();

        videoRentalResult!.Videos.ForEach(f =>
        {
            if (f.Title.Equals(videoTitle))
            {
                f.RealEndOfRentalDate = dateNow;
            }
        });

        VideoRental? result = await DbContext.VideoRentals.FirstOrDefaultAsync(q => q.UserId.Equals(new ObjectId(userId)));
        if (result != null)
        {
            result = videoRentalResult;
        }
        video.IsAvailable = true;
        await DbContext.SaveChangesAsync();
        return result != null;
    }

    private async Task<bool> ReturnRentedVideoBasedOn(string videoTitle, string firstName, string lastName)
    {
        User? user = await DbContext.Users
            .FirstOrDefaultAsync(q => q.FirstName == firstName && q.LastName == lastName);

        if (user == null)
        {
            Logger.LogInformation($"User {firstName} {lastName} does not exist");
            return false;
        }

        Video? video = await DbContext.Videos
            .FirstOrDefaultAsync(q => q.Title == videoTitle);

        if (video == null)
        {
            Logger.LogInformation($"Video with title: {videoTitle} does not exist");
            return false;
        }

        VideoRental? videoRental = await DbContext.VideoRentals
            .FirstOrDefaultAsync(q => q.UserId.Equals(user.Id) &&
                                    q.Videos.Any(v => v.Title == videoTitle));

        if (videoRental == null)
        {
            Logger.LogInformation($"Cannot return rented video because the video rental for user {user.FirstName} {user.LastName} does not exist");
            return false;
        }

        VideoRent? rentedVideo = videoRental.Videos.FirstOrDefault(q => q.Title == videoTitle);
        if (rentedVideo != null)
        {
            rentedVideo.RealEndOfRentalDate = DateTime.UtcNow;
            await DbContext.SaveChangesAsync();
            return true;
        }

        return false;
    }

    private async Task<bool> RentVideoAsyncBasedOn(string videoTitle, string userId)
    {
        User? user = await DbContext.Users.Where(q => q.Id.Equals(new ObjectId(userId))).FirstOrDefaultAsync();
        if (user == null)
        {
            Logger.LogError($"User is null");
            return false;
        }

        Video? video = await DbContext.Videos.Where(q => q.Title.Equals(videoTitle)).FirstOrDefaultAsync();
        if (video == null)
        {
            Logger.LogError($"Video is null");
            return false;
        }

        return await UpdateUserVideosCollection(videoTitle, user);
    }

    private async Task<bool> UpdateUserVideosCollection(string videoTitle, User user)
    {
        VideoRental? videoRental = await DbContext.VideoRentals.Where(q => q.UserId.Equals(user.Id)).FirstOrDefaultAsync();
        if (videoRental == null)
        {
            Logger.LogError($"VideoRental is null. Required to create video rental card for new user.");
            videoRental = await CreateRentalCardAsync(user);
        }

        videoRental.Videos ??= [];
        if (videoRental.Videos.Count > (int)Config.RentVideoLimit)
        {
            Logger.LogInformation($"The limit of user rental with id {user.Id} has been exceeded");
            return false;
        }

        DateTime rentMaxDaysLimit = DateTime.UtcNow.AddDays((int)Config.RentMaxDays);
        videoRental.Videos.Add(new VideoRent
        {
            Title = videoTitle,
            StartRentalDate = DateTime.UtcNow,
            EndRentalDate = rentMaxDaysLimit,
            RealEndOfRentalDate = null
        });

        await DbContext.SaveChangesAsync();
        await UpdateVideoAvailabilityAsync(videoTitle);
        Logger.LogInformation($"Added new film to the collection of user: {user.Id}");
        return true;
    }

    private async Task<bool> UpdateVideoAvailabilityAsync(string videoTitle)
    {
        Video? video = await DbContext.Videos.Where(q => q.Title.Equals(videoTitle)).FirstOrDefaultAsync();
        if (video == null)
        {
            return false;
        }

        video.IsAvailable = false;
        await DbContext.SaveChangesAsync();
        Logger.LogInformation($"Availability video with {nameof(videoTitle)}: {videoTitle} has been changed to false");
        return true;
    }

    private async Task<bool> RentVideoAsyncBasedOn(string videoTitle, string firstName, string lastName)
    {
        User? user = await DbContext.Users.Where(f => f.FirstName.Equals(firstName) && f.LastName.Equals(lastName)).FirstOrDefaultAsync();
        if (user == null)
        {
            return false;
        }

        Video? video = await DbContext.Videos.Where(q => q.Title.Equals(videoTitle)).FirstOrDefaultAsync();
        if (video == null)
        {
            return false;
        }

        return await UpdateUserVideosCollection(videoTitle, user);
    }

    public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
    {
        List<string> unavailableVideoTitles = await DbContext.Videos
            .Where(q => !q.IsAvailable)
            .Select(s => s.Title)
            .ToListAsync() ?? [];

        List<VideoRental> videoRentals = await DbContext.VideoRentals
            .Where(q => q.Videos.Any(a => a.RealEndOfRentalDate == null))
            .ToListAsync() ?? [];

        List<VideoRentalResult> results = [];
        foreach (VideoRental rental in videoRentals)
        {
            List<VideoRent> rentedVideos = rental.Videos
                .Where(q => unavailableVideoTitles.Contains(q.Title))
                .ToList();

            if (rentedVideos.Count > 0)
            {
                results.Add(new VideoRentalResult
                {
                    Id = rental.Id.ToString(),
                    UserId = rental.UserId.ToString(),
                    FirstName = rental.FirstName,
                    LastName = rental.LastName,
                    Videos = rentedVideos.Select(v => new VideoRentResult
                    {
                        Title = v.Title,
                        StartRentalDate = v.StartRentalDate,
                        EndRentalDate = v.EndRentalDate,
                        RealEndOfRentalDate = v.RealEndOfRentalDate
                    }).ToList() ?? []
                });
            }
        }

        return results;
    }

    public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
    {
        VideoRental? videoRental = await DbContext.VideoRentals.Where(q => q.UserId.Equals(new ObjectId(id))).FirstOrDefaultAsync();
        if (videoRental == null)
        {
            Logger.LogError($"{nameof(videoRental)} not found.");
            return null!;
        }

        return new VideoRentalResult
        {
            Id = videoRental.Id.ToString(),
            UserId = videoRental.UserId.ToString(),
            FirstName = videoRental.FirstName,
            LastName = videoRental.LastName,
            Videos = videoRental.Videos.Select(s => new VideoRentResult
            {
                Title = s.Title,
                StartRentalDate = s.StartRentalDate,
                EndRentalDate = s.EndRentalDate,
                RealEndOfRentalDate = s.RealEndOfRentalDate
            }).ToList()
        };
    }

    public async Task<string> CreateVideoRentalAsync(VideoRentalCriteria criteria)
    {
        VideoRental videoRental = new()
        {
            UserId = new ObjectId(criteria.UserId),
            FirstName = criteria.FirstName,
            LastName = criteria.LastName,
            Videos = criteria.Videos.Select(s => new VideoRent
            {
                Title = s.Title,
                StartRentalDate = s.StartRentalDate,
                EndRentalDate = s.EndRentalDate,
                RealEndOfRentalDate = null
            }).ToList()
        };
        await DbContext.VideoRentals.AddAsync(videoRental);
        await DbContext.SaveChangesAsync();
        return videoRental.Id.ToString();
    }

    public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
    {
        VideoRental? videoRental = await DbContext.VideoRentals.FirstOrDefaultAsync(q => q.Id.Equals(new ObjectId(id)));
        if (videoRental != null)
        {
            videoRental.UserId = new ObjectId(criteria.UserId);
            videoRental.FirstName = criteria.FirstName;
            videoRental.LastName = criteria.LastName;

            videoRental.Videos = criteria.Videos.Select(q => new VideoRent
            {
                Title = q.Title,
                StartRentalDate = q.StartRentalDate,
                EndRentalDate = q.EndRentalDate,
                RealEndOfRentalDate = q.RealEndOfRentalDate
            }).ToList();
            await DbContext.SaveChangesAsync();
        }
        else
        {
            Logger.LogError($"VideoRental with id {id} not found.");
        }
    }

    public async Task DeleteVideoRentalAsync(string id)
    {
        VideoRental? videoRental = await DbContext.VideoRentals.FirstOrDefaultAsync(q => q.Id.Equals(new ObjectId(id)));
        if (videoRental != null)
        {
            DbContext.VideoRentals.Remove(videoRental);
            await DbContext.SaveChangesAsync();
        }
        else
        {
            Logger.LogError($"VideoRental with id {id} not found.");
        }
    }
}