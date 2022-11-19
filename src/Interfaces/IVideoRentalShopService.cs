using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.DataTransferObjects.Results;

namespace VideoRentalShopApp.Interfaces
{
    public interface IVideoRentalShopService
    {
        Task<List<UserResult>> GetUsersAsync();
        Task<UserResult> GetUserAsync(string id);
        Task<string> CreateUserAsync(UserCriteria criteria);
        Task UpdateUserAsync(string id, UserCriteria criteria);
        Task DeleteUserAsync(string id);
        Task<List<VideoResult>> GetVideosAsync();
        Task<VideoResult> GetVideoAsync(string id);
        Task<string> CreateVideoAsync(VideoCriteria criteria);
        Task UpdateVideoAsync(string id, VideoCriteria criteria);
        Task DeleteVideoAsync(string id);
        Task<List<VideoRentalResult>> GetVideoRentalsAsync();
        Task<VideoRentalResult> GetVideoRentalAsync(string id);
        Task<string> CreateVideoRentalAsync(VideoRentalCriteria criteria);
        Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria);
        Task DeleteVideoRentalAsync(string id);
    }
}
