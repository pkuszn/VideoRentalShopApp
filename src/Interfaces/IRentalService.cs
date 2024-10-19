using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalStoreApp.DataTransferObjects;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;

namespace VideoRentalStoreApp.Interfaces;
public interface IRentalService
{
    Task<List<UserRentedVideosResults>> GetListOfUserWithRentedVideosAsync();
    Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria);
    Task<bool> ReturnRentedVideoByNamesAsync(RentFilmByNamesCriteria criteria);
    Task<bool> RentVideoByNamesAsync(RentFilmByNamesCriteria criteria);
    Task<bool> RentVideoByIdAsync(RentFilmByIdCriteria criteria);
    Task<List<VideoRentalResult>> GetVideoRentalsAsync();
    Task<VideoRentalResult> GetVideoRentalAsync(string id);
    Task<string> CreateVideoRentalAsync(VideoRentalCriteria criteria);
    Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria);
    Task DeleteVideoRentalAsync(string id);
}
