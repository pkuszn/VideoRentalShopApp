using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoRentalShopApp.Configuration;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.Interfaces;
using VideoRentalShopApp.Models;
using VideoRentalShopApp.Utils;
using static VideoRentalShopApp.Constants.Enums;

namespace VideoRentalShopApp.Services
{
    public class VideoRentalShopService : IVideoRentalShopService
    {
        private readonly IMongoCollection<User> UserCollection;
        private readonly IMongoCollection<Video> VideoCollection;
        private readonly IMongoCollection<VideoRental> VideoRentalCollection;
        private readonly ILogger<VideoRentalShopService> Logger;

        public VideoRentalShopService(IMongoClient mongoClient, IOptions<VideoRentalShopConfiguration> videoRentalShopConfiguration, ILogger<VideoRentalShopService> logger)
        {
            IMongoDatabase database = mongoClient.GetDatabase(videoRentalShopConfiguration.Value.DatabaseName) ?? throw new NullReferenceException();
            UserCollection = database.GetCollection<User>(videoRentalShopConfiguration.Value.UserCollectionName) ?? throw new NullReferenceException();
            VideoCollection = database.GetCollection<Video>(videoRentalShopConfiguration.Value.VideoCollectionName) ?? throw new NullReferenceException();
            VideoRentalCollection = database.GetCollection<VideoRental>(videoRentalShopConfiguration.Value.RentalCollectionName) ?? throw new NullReferenceException();
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<bool> RentVideoAsync(string videoTitle, string userId = null, string firstName = null, string lastName = null)
        {
            if (string.IsNullOrEmpty(videoTitle))
            {
                return false;
            }
            if (!string.IsNullOrEmpty(userId))
            {
                return await RentVideoAsyncBasedOn(videoTitle, userId);
            }
            else if (!string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName))
            {
                return await RentVideoAsyncBasedOn(videoTitle, firstName, lastName);
            }
            else
            {
                return false;
            }
        }

        public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            return await GetListOfAvailableVideosAsync(sortByTitle, sortByGenre) ?? new();
        }

        private async Task<List<VideoResult>> GetListOfAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            SortDefinition<Video> sort = sortByTitle 
                ? Builders<Video>.Sort.Ascending("Title")
                : sortByGenre ? Builders<Video>.Sort.Ascending("Title")
                : null;

            List<Video> videos = sort == null 
                ? await VideoCollection.Find(_ => true).ToListAsync() 
                : await VideoCollection.Find(_ => true).Sort(sort).ToListAsync();

            List<VideoRental> videoRentals = await VideoRentalCollection.Find(_ => true).ToListAsync();
            VideoCollection videoCollection = new(videos, videoRentals);
            Logger.LogInformation($"Available videos on shop collection: {videoCollection.AvailableVideoList.Count}");
            return videoCollection.AvailableVideoList.Select(s => new VideoResult
            {
                Id = s.Id,
                Title = s.Title,
                Score = s.Score,
                Runtime = s.Runtime,
                Genre = s.Genre,
                Director = s.Director,
                Description = s.Description,
                Actors = s.Actors,
                CreatedDate = s.CreatedDate
            }).ToList();
        }

        private async Task<bool> RentVideoAsyncBasedOn(string videoTitle, string firstName, string lastName)
        {
            User user = await UserCollection.Find(f => f.FirstName.Equals(firstName) && f.LastName.Equals(lastName)).FirstOrDefaultAsync();
            if (user == null)
            {
                return false;
            }
            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if (video == null)
            {
                return false;
            }

            return await UpdateUserVideosCollection(videoTitle, firstName, lastName);
        }

        private async Task<bool> RentVideoAsyncBasedOn(string videoTitle, string userId)
        {
            User user = await UserCollection.Find(f => f.Id.Equals(userId)).FirstOrDefaultAsync();
            if (user == null)
            {
                Logger.LogError($"User is null");
                return false;
            }
            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if (video == null)
            {
                Logger.LogError($"Video is null");
                return false;
            }
            return await UpdateUserVideosCollection(videoTitle, userId);
        }

        private async Task<bool> UpdateUserVideosCollection(string videoTitle, string firstName, string lastName)
        {
            VideoRental videoRental = await VideoRentalCollection.Find(f => f.FirstName.Equals(firstName) && f.LastName.Equals(lastName)).FirstOrDefaultAsync();
            if (videoRental == null)
            {
                Logger.LogError($"VideoRental is null");
                return false;
            }
            if (videoRental.Videos == null)
            {
                videoRental.Videos = new();
            }
            if (videoRental.Videos.Count > (int)Config.RentVideoLimit)
            {
                Logger.LogInformation($"The limit of user rental {firstName} {lastName} has been exceeded");
                return false;
            }
            DateTime rentMaxDaysDate = DateTime.UtcNow.AddDays((int)Config.RentMaxDays);
            videoRental.Videos.Add(new VideoRent
            {
                Title = videoTitle,
                StartRentalDate = DateTime.UtcNow,
                EndRentalDate = rentMaxDaysDate,
                RealEndOfRentalDate = null
            });

            await VideoRentalCollection.FindOneAndReplaceAsync(f => f.FirstName.Equals(firstName) && f.LastName.Equals(lastName), videoRental);
            Logger.LogInformation($"Added new film to the collection of user: {firstName} {lastName}");
            return true;
        }

        private async Task<bool> UpdateUserVideosCollection(string videoTitle, string userId)
        {
            VideoRental videoRental = await VideoRentalCollection.Find(f => f.UserId == userId).FirstOrDefaultAsync();
            if (videoRental == null)
            {
                Logger.LogError($"VideoRental is null");
                return false;
            }
            if (videoRental.Videos == null)
            {
                videoRental.Videos = new();
            }
            if (videoRental.Videos.Count > (int)Config.RentVideoLimit)
            {
                Logger.LogInformation($"The limit of user rental with id {userId} has been exceeded");
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

            await VideoRentalCollection.FindOneAndReplaceAsync(f => f.UserId.Equals(userId), videoRental);
            Logger.LogInformation($"Added new film to the collection of user: {userId}");
            return true;
        }

        public async Task<List<UserResult>> GetUsersAsync()
        {
            List<User> users = await UserCollection.Find(_ => true).ToListAsync();
            if ((users?.Count ?? 0) == 0)
            {
                return null;
            }

            return users.Select(s => new UserResult
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Address = s.Address,
                Contact = s.Contact,
                RegistrationDate = s.RegistrationDate
            }).ToList();
        }

        public async Task<UserResult> GetUserAsync(string id)
        {
            User user = await UserCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();
            return new UserResult
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                Contact = user.Contact,
                RegistrationDate = user.RegistrationDate
            };
        }

        public async Task<string> CreateUserAsync(UserCriteria criteria)
        {
            User user = new()
            {
                FirstName = criteria.FirstName,
                LastName = criteria.LastName,
                Address = criteria.Address,
                Contact = criteria.Contact,
                RegistrationDate = DateTime.UtcNow
            };
            await UserCollection.InsertOneAsync(user);
            return user.Id;
        }

        public async Task UpdateUserAsync(string id, UserCriteria criteria)
        {
            await UserCollection.FindOneAndReplaceAsync(x => x.Id.Equals(id), new User
            {
                FirstName = criteria.FirstName,
                LastName = criteria.LastName,
                Address = criteria.Address,
                Contact = criteria.Contact,
                RegistrationDate = DateTime.UtcNow
            });
        }

        public async Task DeleteUserAsync(string id)
        {
            await UserCollection.DeleteOneAsync(x => x.Id.Equals(id));
        }

        public async Task<List<VideoResult>> GetVideosAsync()
        {
            List<Video> videos = await VideoCollection.Find(_ => true).ToListAsync();
            return videos.Select(s => new VideoResult
            {
                Id = s.Id,
                Title = s.Title,
                Genre = s.Genre,
                Director = s.Director,
                Runtime = s.Runtime,
                Score = s.Score,
                Description = s.Description,
                Actors = s.Actors,
                CreatedDate = s.CreatedDate
            }).ToList();
        }

        public async Task<VideoResult> GetVideoAsync(string id)
        {
            Video video = await VideoCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();
            return new VideoResult
            {
                Id = video.Id,
                Title = video.Title,
                Genre = video.Genre,
                Director = video.Director,
                Score = video.Score,
                Runtime = video.Runtime,
                Description = video.Description,
                Actors = video.Actors,
                CreatedDate = video.CreatedDate
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
                Description = criteria.Description,
                Actors = criteria.Actors,
                Score = criteria.Score,
                CreatedDate = DateTime.UtcNow
            };
            await VideoCollection.InsertOneAsync(video);
            return video.Id;
        }

        public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
        {
            await VideoCollection.FindOneAndReplaceAsync(x => x.Id.Equals(id), new Video
            {
                Title = criteria.Title,
                Genre = criteria.Genre,
                Director = criteria.Director,
                Runtime = criteria.Runtime,
                Description = criteria.Description,
                Actors = criteria.Actors,
                Score = criteria.Score,
                CreatedDate = DateTime.UtcNow
            });
        }

        public async Task DeleteVideoAsync(string id)
        {
            await VideoCollection.DeleteOneAsync(x => x.Id.Equals(id));
        }

        public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
        {
            List<VideoRental> videoRentals = await VideoRentalCollection.Find(_ => true).ToListAsync();
            return videoRentals.Select(s => new VideoRentalResult
            {
                Id = s.Id,
                UserId = s.UserId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Videos = s.Videos.Select(s => new VideoRentResult
                {
                    Title = s.Title,
                    StartRentalDate = s.StartRentalDate,
                    EndRentalDate = s.EndRentalDate,
                    RealEndOfRentalDate = s.RealEndOfRentalDate
                }).ToList()
            }).ToList();
        }

        public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
        {
            VideoRental videoRental = await VideoRentalCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();
            return new VideoRentalResult
            {
                Id = videoRental.Id,
                UserId = videoRental.UserId,
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
                UserId = criteria.UserId,
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
            await VideoRentalCollection.InsertOneAsync(videoRental);
            return videoRental.Id;
        }

        public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
        {
            await VideoRentalCollection.FindOneAndReplaceAsync(x => x.Id.Equals(id), new VideoRental
            {
                UserId = criteria.UserId,
                FirstName = criteria.FirstName,
                LastName = criteria.LastName,
                Videos = criteria.Videos.Select(s => new VideoRent
                {
                    Title = s.Title,
                    StartRentalDate = s.StartRentalDate,
                    EndRentalDate = s.EndRentalDate,
                    RealEndOfRentalDate = s.RealEndOfRentalDate
                }).ToList()
            });
        }

        public async Task DeleteVideoRentalAsync(string id)
        {
            await VideoRentalCollection.DeleteOneAsync(x => x.Id.Equals(id));
        }
    }
}
