using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;

namespace VideoRentalStoreApp.Interfaces;
public interface IVideoService
{
    Task<List<VideoResult>> GetMyVideosByIdAsync(string id);
    Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre);
    Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre);
    Task<List<VideoResult>> GetVideosAsync();
    Task<VideoResult> GetVideoAsync(string id);
    Task<string> CreateVideoAsync(VideoCriteria criteria);
    Task UpdateVideoAsync(string id, VideoCriteria criteria);
    Task<bool> DeleteVideoAsync(string id);
    Task<List<VideoResult>> SearchVideoAsync(string title);
}
