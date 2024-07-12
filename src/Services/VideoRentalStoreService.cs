using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoRentalStoreApp.Configuration;
using VideoRentalStoreApp.DataTransferObjects;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Models;
using static VideoRentalStoreApp.Constants.Enums;

namespace VideoRentalStoreApp.Services
{
    public class VideoRentalStoreService : IVideoRentalStoreService
    {
        private readonly IMongoCollection<User> UserCollection;
        private readonly IMongoCollection<Video> VideoCollection;
        private readonly IMongoCollection<VideoRental> VideoRentalCollection;
        private readonly ILogger<VideoRentalStoreService> Logger;
        private readonly IMongoDatabase Database;

        public VideoRentalStoreService(IMongoClient mongoClient, IOptions<VideoRentalStoreConfiguration> videoRentalShopConfiguration, ILogger<VideoRentalStoreService> logger)
        {
            Database = mongoClient.GetDatabase(videoRentalShopConfiguration.Value.DatabaseName) ?? throw new NullReferenceException();
            UserCollection = Database.GetCollection<User>(videoRentalShopConfiguration.Value.UserCollectionName) ?? throw new NullReferenceException();
            VideoCollection = Database.GetCollection<Video>(videoRentalShopConfiguration.Value.VideoCollectionName) ?? throw new NullReferenceException();
            VideoRentalCollection = Database.GetCollection<VideoRental>(videoRentalShopConfiguration.Value.RentalCollectionName) ?? throw new NullReferenceException();
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<List<UserResult>> GetUsersWhoHaveRentedMovies()
        {
            FilterDefinitionBuilder<VideoRental> filterVideoRental = Builders<VideoRental>.Filter;
            FilterDefinition<VideoRental> videoRealEndOfRentFilter = filterVideoRental.ElemMatch(x => x.Videos, c => c.RealEndOfRentalDate.Equals(null));
            List<VideoRental> videoRentals = await VideoRentalCollection.Find(videoRealEndOfRentFilter).ToListAsync();
            if ((videoRentals?.Count ?? 0) == 0)
            {
                Logger.LogError($"{nameof(videoRentals)} is null or empty.");
                return null;
            }

            string[] userIds = videoRentals.Select(s => s.UserId).ToArray();

            FilterDefinition<User> filter = Builders<User>.Filter.In(i => i.Id, userIds);
            List<User> users = await UserCollection.Find(filter).ToListAsync();
            return users.Select(s => new UserResult() { Id = s.Id, FirstName = s.FirstName, LastName = s.LastName, Address = s.Address, Contact = s.Contact, RegistrationDate = s.RegistrationDate }).ToList();
        }

        public async Task<List<VideoResult>> GetMyVideosByIdAsync(string id)
        {
            User user = await UserCollection.Find(f => f.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                Logger.LogError($"Cannot find user with {nameof(id)}: {id}");
                return null;
            }

            List<VideoRent> videoRental = await VideoRentalCollection.Find(f => f.UserId == user.Id).Project(p => p.Videos).FirstOrDefaultAsync();
            return await GetMyVideosAsync(videoRental.Select(s => s.Title).ToArray());
        }

        private async Task<List<VideoResult>> GetMyVideosAsync(string[] videosArray)
        {
            if ((videosArray?.Length ?? 0) == 0)
            {
                Logger.LogError("Collection with user videos is empty");
                return null;
            }

            FilterDefinitionBuilder<Video> filter = Builders<Video>.Filter;
            FilterDefinition<Video> videoFilter = filter.And(
              filter.Eq(x => x.IsAvailable, false),
              filter.In(movie => movie.Title, videosArray));

            List<Video> videos = await VideoCollection.Find(videoFilter).ToListAsync();
            return videos != null || videos.Count > 0 ? videos.Select(s => new VideoResult
            {
                Id = s.Id,
                Title = s.Title,
                Director = s.Director,
                Genre = s.Genre,
                Runtime = s.Runtime,
                Score = s.Score,
                Description = s.Description,
                CreatedDate = s.CreatedDate,
                IsAvailable = s.IsAvailable,
                Actors = s.Actors
            }).ToList() : new();
        }

        public async Task<List<UserRentedVideosResults>> GetListOfUserWithRentedVideosAsync()
        {
            return await GetListOfRentsAsync();
        }

        public async Task<List<LoginResult>> GetLoginUsers()
        {
            List<User> loginList = await UserCollection.Find(_ => true).ToListAsync();
            return loginList.Select(s => new LoginResult { Id = s.Id, User = s.UserName, Password = s.Password }).ToList();
        }

        public async Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria)
        {
            return await ReturnRentedVideoBasedOn(criteria.Title, criteria.UserId);
        }

        public async Task<bool> ReturnRentedVideoByNamesAsync(RentFilmByNamesCriteria criteria)
        {
            return await ReturnRentedVideoBasedOn(criteria.Title, criteria.FirstName, criteria.LastName);
        }

        public async Task<bool> RentVideoByNamesAsync(RentFilmByNamesCriteria criteria)
        {
            return await RentVideoAsyncBasedOn(criteria.Title, criteria.FirstName, criteria.LastName);
        }

        public async Task<bool> RentVideoByIdAsync(RentFilmByIdCriteria criteria)
        {
            return await RentVideoAsyncBasedOn(criteria.Title, criteria.UserId);
        }

        public async Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre)
        {
            return await GetListOfAvailableShortVideosAsync(sortByTitle, sortByGenre);
        }

        public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            return await GetListOfAvailableVideosAsync(sortByTitle, sortByGenre);
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
                CreatedDate = s.CreatedDate,
                IsAvailable = s.IsAvailable
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
                Description = criteria.Description,
                Actors = criteria.Actors,
                Score = criteria.Score,
                CreatedDate = DateTime.UtcNow,
                IsAvailable = true
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
                CreatedDate = DateTime.UtcNow,
                IsAvailable = criteria.IsAvailable
            });
        }

        public async Task<bool> DeleteVideoAsync(string id)
        {
            Video video = await VideoCollection.Find(f => f.Id == id).FirstOrDefaultAsync();
            if (video == null)
            {
                Logger.LogError($"Video with {nameof(id)}: id not exists in db.");
            }

            if (!video.IsAvailable)
            {
                Logger.LogError("Cannot remove rented video.");
                return false;
            }

            await VideoCollection.DeleteOneAsync(x => x.Id.Equals(id));
            return true;
        }

        public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
        {
            List<Video> unavailableVideos = await VideoCollection.Find(f => f.IsAvailable == false).ToListAsync();
            HashSet<string> unavailableVideoTitles = new(unavailableVideos.Select(v => v.Title));

            var filterBuilder = Builders<VideoRental>.Filter;
            var videoRealEndOfRentFilter = filterBuilder.ElemMatch(vr => vr.Videos, v => v.RealEndOfRentalDate == null);

            List<VideoRental> videoRentals = await VideoRentalCollection.Find(videoRealEndOfRentFilter).ToListAsync();

            List<VideoRentalResult> results = [];
            foreach (VideoRental rental in videoRentals)
            {
                List<VideoRent> rentedVideos = rental.Videos.Where(v => unavailableVideoTitles.Contains(v.Title)).ToList();

                if (rentedVideos.Count > 0)
                {
                    results.Add(new VideoRentalResult
                    {
                        Id = rental.Id,
                        UserId = rental.UserId,
                        FirstName = rental.FirstName,
                        LastName = rental.LastName,
                        Videos = rentedVideos.Select(v => new VideoRentResult
                        {
                            Title = v.Title,
                            StartRentalDate = v.StartRentalDate,
                            EndRentalDate = v.EndRentalDate,
                            RealEndOfRentalDate = v.RealEndOfRentalDate
                        }).ToList()
                    });
                }
            }

            return results;
        }


        public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
        {
            VideoRental videoRental = await VideoRentalCollection.Find(x => x.UserId.Equals(id)).FirstOrDefaultAsync();
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

        private async Task<List<VideoResult>> GetListOfAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            SortDefinition<Video> sort = sortByTitle
                ? Builders<Video>.Sort.Ascending("Title")
                : sortByGenre ? Builders<Video>.Sort.Ascending("Genre")
                : null;

            List<Video> videos = sort == null
                ? await VideoCollection.Find(f => f.IsAvailable == true).ToListAsync()
                : await VideoCollection.Find(f => f.IsAvailable == true).Sort(sort).ToListAsync();

            Logger.LogInformation($"Available videos in shop: {videos.Count}");
            return videos.Select(s => new VideoResult
            {
                Id = s.Id,
                Title = s.Title,
                Score = s.Score,
                Runtime = s.Runtime,
                Genre = s.Genre,
                Director = s.Director,
                Description = s.Description,
                Actors = s.Actors,
                CreatedDate = s.CreatedDate,
                IsAvailable = s.IsAvailable
            }).ToList();
        }

        private async Task<List<VideoShortResult>> GetListOfAvailableShortVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            SortDefinition<Video> sort = sortByTitle
                ? Builders<Video>.Sort.Ascending("Title")
                : sortByGenre ? Builders<Video>.Sort.Ascending("Title")
                : null;

            List<Video> videos = sort == null
                ? await VideoCollection.Find(_ => true).ToListAsync()
                : await VideoCollection.Find(_ => true).Sort(sort).ToListAsync();

            Logger.LogInformation($"Available videos on shop collection: {videos.Count}");
            return videos.Select(s => new VideoShortResult
            {
                Id = s.Id,
                Title = s.Title,
                Runtime = s.Runtime,
                Genre = s.Genre,
                Director = s.Director,
                IsAvailable = s.IsAvailable
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

            return await UpdateUserVideosCollection(videoTitle, user);
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

            return await UpdateUserVideosCollection(videoTitle, user);
        }

        private async Task<bool> UpdateUserVideosCollection(string videoTitle, User user)
        {
            VideoRental videoRental = await VideoRentalCollection.Find(f => f.UserId == user.Id).FirstOrDefaultAsync();
            if (videoRental == null)
            {
                Logger.LogError($"VideoRental is null. Required to create video rental card for new user.");
                videoRental = await CreateRentalCardAsync(user);
            }

            if (videoRental.Videos == null)
            {
                videoRental.Videos = [];
            }

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

            await VideoRentalCollection.FindOneAndReplaceAsync(f => f.UserId.Equals(user.Id), videoRental);
            await UpdateVideoAvailabilityAsync(videoTitle);
            Logger.LogInformation($"Added new film to the collection of user: {user.Id}");
            return true;
        }

        private async Task<bool> UpdateVideoAvailabilityAsync(string videoTitle)
        {
            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if (video == null)
            {
                return false;
            }

            video.IsAvailable = false;
            await VideoCollection.FindOneAndReplaceAsync(f => f.Id.Equals(video.Id), video);
            Logger.LogInformation($"Availability video with {nameof(videoTitle)}: {videoTitle} has been changed to false");
            return true;
        }

        private async Task<VideoRental> CreateRentalCardAsync(User user)
        {
            if (user == null)
            {
                return null;
            }
            VideoRental videoRental = new()
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Videos = new()
            };
            await VideoRentalCollection.InsertOneAsync(videoRental);
            return videoRental;
        }

        private async Task<bool> ReturnRentedVideoBasedOn(string videoTitle, string userId)
        {
            User user = await UserCollection.Find(f => f.Id.Equals(userId)).FirstOrDefaultAsync();
            if (user == null)
            {
                Logger.LogInformation($"User with id: {userId} not exists");
                return false;
            }

            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if (video == null)
            {
                Logger.LogInformation($"Video with title: {videoTitle} not exists");
                return false;
            }

            FilterDefinitionBuilder<VideoRental> filter = Builders<VideoRental>.Filter;
            FilterDefinition<VideoRental> videoRentalIdTitle = filter.And(
              filter.Eq(x => x.UserId, user.Id),
              filter.ElemMatch(x => x.Videos, c => c.Title == videoTitle));

            DateTime dateNow = DateTime.UtcNow;
            VideoRental videoRentalResult = await VideoRentalCollection.Find(videoRentalIdTitle).FirstOrDefaultAsync();
            videoRentalResult.Videos.ForEach(f =>
            {
                if (f.Title.Equals(videoTitle))
                {
                    f.RealEndOfRentalDate = dateNow;
                }
            });

            VideoRental result = await VideoRentalCollection.FindOneAndReplaceAsync(f => f.UserId == userId, videoRentalResult);
            await ReturnRentedVideo(video);
            return result != null;
        }

        private async Task<bool> ReturnRentedVideo(Video video)
        {
            video.IsAvailable = true;
            await VideoCollection.FindOneAndReplaceAsync(f => f.Id.Equals(video.Id), video);
            return true;
        }

        private async Task<bool> ReturnRentedVideoBasedOn(string videoTitle, string firstName, string lastName)
        {
            User user = await UserCollection.Find(f => f.FirstName.Equals(firstName) && f.LastName.Equals(lastName)).FirstOrDefaultAsync();
            if (user == null)
            {
                Logger.LogInformation($"User {firstName} {lastName} not exists");
                return false;
            }

            Video video = await VideoCollection.Find(f => f.Title.Equals(videoTitle)).FirstOrDefaultAsync();
            if (video == null)
            {
                Logger.LogInformation($"Video with title: {videoTitle} not exists");
                return false;
            }

            FilterDefinitionBuilder<VideoRental> filter = Builders<VideoRental>.Filter;
            FilterDefinition<VideoRental> videoRentalIdTitle = filter.And(
              filter.Eq(x => x.UserId, user.Id),
              filter.ElemMatch(x => x.Videos, c => c.Title == videoTitle));

            if (filter == null || videoRentalIdTitle == null)
            {
                Logger.LogInformation($"Cannot return rented video because video rental of user {user.FirstName} {user.LastName} not exists");
                return false;
            }

            UpdateDefinitionBuilder<VideoRental> update = Builders<VideoRental>.Update;
            DateTime dateNow = DateTime.UtcNow;
            UpdateDefinition<VideoRental> setRealEndOfRentDate = update.Set("Videos.$.RealEndOfRentalDate", dateNow.ToString());
            VideoRental result = await VideoRentalCollection.FindOneAndUpdateAsync(videoRentalIdTitle, setRealEndOfRentDate);
            return result != null;
        }

        private async Task<List<UserRentedVideosResults>> GetListOfRentsAsync()
        {
            List<VideoRental> videoRentals = await VideoRentalCollection.Find(_ => true).ToListAsync();
            if ((videoRentals?.Count ?? 0) == 0)
            {
                Logger.LogInformation($"Video list is null");
                return null;
            }

            string[] userIds = videoRentals.Select(s => s.UserId).ToArray();
            FilterDefinition<User> filter = Builders<User>.Filter.In(i => i.Id, userIds);
            List<User> users = await UserCollection.Find(filter).ToListAsync();
            if ((users?.Count ?? 0) == 0)
            {
                Logger.LogInformation($"User list is null");
                return null;
            }

            List<UserRentedVideosResults> userRentedVideosResults = new();
            foreach (VideoRental videoRental in videoRentals)
            {
                User user = users.FirstOrDefault(f => f.Id == videoRental.UserId);
                if (user == null)
                {
                    continue;
                }

                foreach (VideoRent video in videoRental.Videos)
                {
                    userRentedVideosResults.Add(new UserRentedVideosResults
                    {
                        Id = videoRental.Id,
                        FirstName = videoRental.FirstName,
                        LastName = videoRental.LastName,
                        Address = user.Address,
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

        public async Task<List<VideoResult>> SearchVideoAsync(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return null;
            }

            var filter = Builders<Video>.Filter.Regex("Title", new MongoDB.Bson.BsonRegularExpression(title, "i"));
            var videos = await VideoCollection.Find(filter).ToListAsync();
            return videos.Count > 0 ? videos.Select(s => new VideoResult
            {
                Id = s.Id,
                Title = s.Title,
                Score = s.Score,
                Runtime = s.Runtime,
                Genre = s.Genre,
                Director = s.Director,
                Description = s.Description,
                Actors = s.Actors,
                CreatedDate = s.CreatedDate,
                IsAvailable = s.IsAvailable
            }).ToList() : [];
        }
    }
}
