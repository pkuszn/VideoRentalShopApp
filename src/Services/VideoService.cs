using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Models;

namespace VideoRentalStoreApp.Services;
internal class VideoService : IVideoService
{
    private readonly ILogger<VideoService> Logger;
    private readonly VideoRentalStoreDbContext DbContext;
    public VideoService(VideoRentalStoreDbContext dbContext, ILogger<VideoService> logger)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre)
    {
        return await GetListOfAvailableShortVideosAsync(sortByTitle, sortByGenre);
    }

    public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
    {
        return await GetListOfAvailableVideosAsync(sortByTitle, sortByGenre);
    }

    public async Task<List<VideoResult>> SearchVideoAsync(string title)
    {
        return await SearchVideoByTitleAsync(title);
    }
    public async Task<List<VideoResult>> GetMyVideosByIdAsync(string id)
    {
        User? user = await DbContext.Users.FirstOrDefaultAsync(q => q.Id.Equals(new ObjectId(id)));
        if (user == null)
        {
            Logger.LogError($"Cannot find user with {nameof(id)}: {id}");
            return null!;
        }
        List<VideoRent>? videoRental = await DbContext.VideoRentals
            .Where(q => q.UserId.Equals(user.Id))
            .Select(s => s.Videos)
            .FirstOrDefaultAsync();

        if (videoRental == null || videoRental.Count == 0)
        {
            return [];
        }

        return await GetMyVideosAsync(videoRental.Select(v => v.Title).ToArray());
    }
    public async Task DeleteUserAsync(string id)
    {
        User? user = await DbContext.Users.FirstOrDefaultAsync(f => f.Id.Equals(new ObjectId(id)));
        if (user != null)
        {
            DbContext.Users.Remove(user);
            await DbContext.SaveChangesAsync();
        }
        else
        {
            Logger.LogError($"User with {nameof(id)}: {id} not found.");
        }
    }
    public async Task<List<VideoResult>> GetVideosAsync()
    {
        List<Video> videos = await DbContext.Videos.ToListAsync();
        return videos.Select(s => new VideoResult
        {
            Id = s.Id.ToString(),
            Title = s.Title,
            Genre = s.Genre,
            Director = s.Director,
            Runtime = s.Runtime,
            Score = s.Score,
            Description = s.Description,
            Actors = s.Actors!,
            CreatedDate = s.CreatedDate,
            IsAvailable = s.IsAvailable
        }).ToList();
    }

    public async Task<VideoResult> GetVideoAsync(string id)
    {
        Video? video = await DbContext.Videos.FirstOrDefaultAsync(x => x.Id.Equals(new ObjectId(id)));
        return new VideoResult
        {
            Id = video!.Id.ToString(),
            Title = video.Title,
            Genre = video.Genre,
            Director = video.Director,
            Score = video.Score,
            Runtime = video.Runtime,
            Description = video.Description,
            Actors = video.Actors!,
            CreatedDate = video.CreatedDate,
            IsAvailable = video.IsAvailable
        };
    }

    public async Task<string> CreateVideoAsync(VideoCriteria criteria)
    {
        Video video = new()
        {
            Title = criteria.Title,
            Genre = criteria.Genre,
            Director = criteria.Director,
            Runtime = criteria.Runtime,
            Description = criteria.Description!,
            Actors = criteria.Actors,
            Score = criteria.Score,
            CreatedDate = DateTime.UtcNow,
            IsAvailable = true
        };

        await DbContext.Videos.AddAsync(video);
        await DbContext.SaveChangesAsync();
        return video.Id.ToString();
    }

    public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
    {
        Video? video = await DbContext.Videos.FirstOrDefaultAsync(f => f.Id.Equals(new ObjectId(id)));
        if (video != null)
        {
            video.Title = criteria.Title;
            video.Genre = criteria.Genre;
            video.Director = criteria.Director;
            video.Runtime = criteria.Runtime;
            video.Description = criteria.Description!;
            video.Actors = criteria.Actors;
            video.Score = criteria.Score;
            video.IsAvailable = criteria.IsAvailable;

            DbContext.Videos.Update(video);
            await DbContext.SaveChangesAsync();
        }
    }

    public async Task<bool> DeleteVideoAsync(string id)
    {
        Video? video = await DbContext.Videos.FirstOrDefaultAsync(f => f.Id.Equals(new ObjectId(id)));
        if (video == null)
        {
            Logger.LogError($"Video with {nameof(id)}: id not exists in db.");
            return false;
        }

        if (!video.IsAvailable)
        {
            Logger.LogError("Cannot remove rented video.");
            return false;
        }

        DbContext.Videos.Remove(video);
        await DbContext.SaveChangesAsync();
        return true;
    }

    private async Task<List<VideoResult>> GetMyVideosAsync(string[] videosArray)
    {
        if ((videosArray?.Length ?? 0) == 0)
        {
            Logger.LogError("Collection with user videos is empty");
            return null!;
        }

        List<Video> videos = await DbContext.Videos
            .Where(q => !q.IsAvailable && videosArray!.Contains(q.Title))
            .ToListAsync();

        return videos.Select(s => new VideoResult
        {
            Id = s.Id.ToString(),
            Title = s.Title,
            Director = s.Director,
            Genre = s.Genre,
            Runtime = s.Runtime,
            Score = s.Score,
            Description = s.Description,
            CreatedDate = s.CreatedDate,
            IsAvailable = s.IsAvailable,
            Actors = s.Actors!
        }).ToList();
    }

    private async Task<List<VideoResult>> SearchVideoByTitleAsync(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return null!;
        }

        List<Video> videos = await DbContext.Videos
            .Where(q => q.Title.Contains(title))
            .ToListAsync();

        return videos.Select(s => new VideoResult
        {
            Id = s.Id.ToString(),
            Title = s.Title,
            Score = s.Score,
            Runtime = s.Runtime,
            Genre = s.Genre,
            Director = s.Director,
            Description = s.Description,
            Actors = s.Actors!,
            CreatedDate = s.CreatedDate,
            IsAvailable = s.IsAvailable
        }).ToList();
    }

    private async Task<List<VideoResult>> GetListOfAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
    {
        IQueryable<Video> query = DbContext.Videos.Where(q => q.IsAvailable == true);
        if (sortByTitle)
        {
            query = query.OrderBy(o => o.Title);
        }
        else if (sortByGenre)
        {
            query = query.OrderBy(o => o.Genre);
        }

        List<Video> videos = await query.ToListAsync();
        Logger.LogInformation($"Available videos in shop: {videos.Count}");
        return videos.Select(s => new VideoResult
        {
            Id = s.Id.ToString(),
            Title = s.Title,
            Score = s.Score,
            Runtime = s.Runtime,
            Genre = s.Genre,
            Director = s.Director,
            Description = s.Description,
            Actors = s.Actors!,
            CreatedDate = s.CreatedDate,
            IsAvailable = s.IsAvailable
        }).ToList();
    }
    private async Task<List<VideoShortResult>> GetListOfAvailableShortVideosAsync(bool sortByTitle, bool sortByGenre)
    {
        IQueryable<Video> query = DbContext.Videos.AsQueryable();
        if (sortByTitle)
        {
            query = query.OrderBy(o => o.Title);
        }
        else if (sortByGenre)
        {
            query = query.OrderBy(o => o.Genre);
        }

        List<Video> videos = await query.ToListAsync();
        Logger.LogInformation($"Available videos on shop collection: {videos.Count}");
        return videos.Select(s => new VideoShortResult
        {
            Id = s.Id.ToString(),
            Title = s.Title,
            Runtime = s.Runtime,
            Genre = s.Genre,
            Director = s.Director,
            IsAvailable = s.IsAvailable
        }).ToList();
    }
}