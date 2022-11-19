using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoRentalShopApp.Configuration;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.DataTransferObjects.Results;
using VideoRentalShopApp.Interfaces;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.Services
{
    public class VideoRentalShopService: IVideoRentalShopService
    {
        private readonly IMongoCollection<User> UserCollection;
        private readonly IMongoCollection<Video> VideoCollection;
        private readonly IMongoCollection<VideoRental> VideoRentalCollection;

        public VideoRentalShopService(IMongoClient mongoClient, IOptions<VideoRentalShopConfiguration> videoRentalShopConfiguration)
        {
            IMongoDatabase database = mongoClient.GetDatabase(videoRentalShopConfiguration.Value.DatabaseName) ?? throw new NullReferenceException();
            UserCollection = database.GetCollection<User>(videoRentalShopConfiguration.Value.UserCollectionName) ?? throw new NullReferenceException();
            VideoCollection = database.GetCollection<Video>(videoRentalShopConfiguration.Value.VideoCollectionName) ?? throw new NullReferenceException();
            VideoRentalCollection = database.GetCollection<VideoRental>(videoRentalShopConfiguration.Value.RentalCollectionName) ?? throw new NullReferenceException();
        }

        public async Task<bool> RentVideoAsync(string videoTitle, string userId = null, string firstName = null, string lastName = null)
        {
            if (string.IsNullOrEmpty(videoTitle))
            {
                return false;
            }

            if (!string.IsNullOrEmpty(userId))
            {
                return await RentVideoBasedOnUserId(videoTitle, userId);
            }
            else if(!string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName))
            {
                return await RentVideoBasedOnUserData(videoTitle, firstName, lastName);
            }
            else
            {
                return false;
            }
        }

        private async Task<bool> RentVideoBasedOnUserData(string videoTitle, string firstName, string lastName)
        {
            throw new NotImplementedException();
        }

        private async Task<bool> RentVideoBasedOnUserId(string videoTitle, string userId)
        {
            User user = await UserCollection.Find(f => f.Id.Equals(userId)).FirstOrDefaultAsync();
            if(user == null)
            {
                return false;
            }

            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if(video == null)
            {
                return false;
            }
            return true;
        }

        public async Task<List<UserResult>> GetUsersAsync()
        {
            List<User> users = await UserCollection.Find(_ => true).ToListAsync();
            if((users?.Count ?? 0) == 0)
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
