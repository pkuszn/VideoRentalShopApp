using MongoDB.Driver;
using System;
using VideoRentalShopApp.Configuration;
using VideoRentalShopApp.Interfaces;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.Services
{
    public class VideoRentalShopService: IVideoRentalShopService
    {
        private readonly IMongoCollection<User> UserCollection;
        private readonly IMongoCollection<Video> VideoCollection;
        private readonly IMongoCollection<VideoRental> VideoRentalCollection;

        public VideoRentalShopService(IMongoClient mongoClient, VideoRentalShopConfiguration videoRentalShopConfiguration)
        {
            IMongoDatabase database = mongoClient.GetDatabase("DatabaseName") ?? throw new NullReferenceException();
            UserCollection = database.GetCollection<User>(videoRentalShopConfiguration.UserCollectionName) ?? throw new NullReferenceException();
            VideoCollection = database.GetCollection<Video>(videoRentalShopConfiguration.VideoCollectionName) ?? throw new NullReferenceException();
            VideoRentalCollection = database.GetCollection<VideoRental>(videoRentalShopConfiguration.RentalCollectionName) ?? throw new NullReferenceException();
        }
    }
}
