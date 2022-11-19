using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalShopApp.Configuration;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.Interfaces;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.Services
{
    public class VideoRentalShopService: IVideoRentalShopService
    {
        private readonly IMongoCollection<User> UserCollection;
        private readonly IMongoCollection<Video> VideoCollection;
        private readonly IMongoCollection<VideoRental> VideoRentalCollection;

        public VideoRentalShopService(IMongoClient mongoClient, IOptions<VideoRentalShopConfiguration>videoRentalShopConfiguration)
        {
            IMongoDatabase database = mongoClient.GetDatabase("DatabaseName") ?? throw new NullReferenceException();
            UserCollection = database.GetCollection<User>(videoRentalShopConfiguration.Value.UserCollectionName) ?? throw new NullReferenceException();
            VideoCollection = database.GetCollection<Video>(videoRentalShopConfiguration.Value.VideoCollectionName) ?? throw new NullReferenceException();
            VideoRentalCollection = database.GetCollection<VideoRental>(videoRentalShopConfiguration.Value.RentalCollectionName) ?? throw new NullReferenceException();
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await UserCollection.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetUserAsync(string id)
        {
            return await UserCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(UserCriteria criteria)
        {
            await UserCollection.InsertOneAsync(new User
            {
                FirstName = criteria.FirstName,
                LastName = criteria.LastName,
                Address = criteria.Address,
                Contact = criteria.Contact,
                RegistrationDate = DateTime.UtcNow
            }); 
        }

        public async Task UpdateUserAsync(string id, UserCriteria criteria)
        {
            await UserCollection.ReplaceOneAsync(x => x.Id == id, new User
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
            await UserCollection.DeleteOneAsync(x => x.Id == id);
        }


        public async Task<List<Video>> GetVideosAsync()
        {
            return await VideoCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Video> GetVideoAsync(string id)
        {
            return await VideoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateVideoAsync(VideoCriteria criteria)
        {
            await VideoCollection.InsertOneAsync(new Video
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

        public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
        {
            await VideoCollection.ReplaceOneAsync(x => x.Id == id, new Video
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
            await VideoCollection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task<List<VideoRental>> GetVideoRentalsAsync()
        {
            return await VideoRentalCollection.Find(_ => true).ToListAsync();
        }

        public async Task<VideoRental> GetVideoRentalAsync(string id)
        {
            return await VideoRentalCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateVideoRentalAsync(VideoRentalCriteria criteria)
        {
            await VideoRentalCollection.InsertOneAsync(new VideoRental
            {
                User = criteria.User,
                Title = criteria.Title,
                StartRentalDate = criteria.StartRentalDate,
                EndRentalDate = criteria.EndRentalDate,
                RealEndOfRentalDate = null
            });
        }

        public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
        {
            await VideoRentalCollection.ReplaceOneAsync(x => x.Id == id, new VideoRental
            {
                User = criteria.User,
                Title = criteria.Title,
                StartRentalDate = criteria.StartRentalDate,
                EndRentalDate = criteria.EndRentalDate,
                RealEndOfRentalDate = null
            });
        }

        public async Task DeleteVideoRentalAsync(string id)
        {
            await VideoRentalCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}
