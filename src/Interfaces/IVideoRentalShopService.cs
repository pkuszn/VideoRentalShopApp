using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.Interfaces
{
    public interface IVideoRentalShopService
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(string id);
        Task CreateUserAsync(UserCriteria criteria);
        Task UpdateUserAsync(string id, UserCriteria criteria);
        Task DeleteUserAsync(string id);
        Task<List<Video>> GetVideosAsync();
        Task<Video> GetVideoAsync(string id);
        Task CreateVideoAsync(VideoCriteria criteria);
        Task UpdateVideoAsync(string id, VideoCriteria criteria);
        Task DeleteVideoAsync(string id);
        Task<List<VideoRental>> GetVideoRentalsAsync();
        Task<VideoRental> GetVideoRentalAsync(string id);
        Task CreateVideoRentalAsync(VideoRentalCriteria criteria);
        Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria);
        Task DeleteVideoRentalAsync(string id);
    }
}
