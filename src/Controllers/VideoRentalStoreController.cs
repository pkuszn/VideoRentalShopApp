using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using VideoRentalStoreApp.DataTransferObjects;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;

namespace VideoRentalStoreApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoRentalStoreController : ControllerBase
    {
        private readonly IVideoRentalStoreService VideoRentalStoreService;
        private readonly ILogger<VideoRentalStoreController> Logger;
        public VideoRentalStoreController(IVideoRentalStoreService videoRentalStoreService, ILogger<VideoRentalStoreController> logger)
        {
            VideoRentalStoreService = videoRentalStoreService ?? throw new ArgumentNullException(nameof(videoRentalStoreService));
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Route("GetUsersWhoHaveRentedVideos")]
        public async Task<List<UserResult>> GetUsersWhoHaveRentedVideos()
        {
            return await VideoRentalStoreService.GetUsersWhoHaveRentedMovies();
        }

        [HttpGet]
        [Route("GetMyVideos/{id}")]
        public async Task<List<VideoResult>> GetMyVideosAsync(string id)
        {
            return await VideoRentalStoreService.GetMyVideosByIdAsync(id);
        }

        [HttpGet]
        [Route("GetLoginUsers")]
        public async Task<List<LoginResult>> GetLoginResultsAsync()
        {
            return await VideoRentalStoreService.GetLoginUsers();
        }

        [HttpGet]
        [Route("GetListOfRents")]
        public async Task<List<UserRentedVideosResults>> GetListOfRentsAsync()
        {
            return await VideoRentalStoreService.GetListOfUserWithRentedVideosAsync();
        }

        [HttpPut]
        [Route("ReturnRentedVideoById")]
        public async Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria)
        {
            return await VideoRentalStoreService.ReturnRentedVideoByIdAsync(criteria);
        }

        [HttpPut]
        [Route("ReturnRentedVideoByNames")]
        public async Task<bool> ReturnRentedVideByNamesAsync(RentFilmByNamesCriteria criteria)
        {
            return await VideoRentalStoreService.ReturnRentedVideoByNamesAsync(criteria);
        }

        [HttpGet]
        [Route("GetAvailableVideos")]
        public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            return await VideoRentalStoreService.GetAvailableVideosAsync(sortByTitle, sortByGenre);
        }

        [HttpGet]
        [Route("GetAvailableVideoShort")]
        public async Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre)
        {
            return await VideoRentalStoreService.GetAvailableVideosShortAsync(sortByTitle, sortByGenre);
        }

        [HttpPost]
        [Route("RentFilmByNames")]
        public async Task<bool> RentVideoAsyncByNames(RentFilmByNamesCriteria criteria)
        {
            return await VideoRentalStoreService.RentVideoByNamesAsync(criteria);
        }

        [HttpPost]
        [Route("RentFilmById")]
        public async Task<bool> RentVideoAsyncById(RentFilmByIdCriteria criteria)
        {
            return await VideoRentalStoreService.RentVideoByIdAsync(criteria);
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<List<UserResult>> GetUsersAsync()
        {
            return await VideoRentalStoreService.GetUsersAsync();
        }

        [HttpGet]
        [Route("GetVideos")]
        public async Task<List<VideoResult>> GetVideosAsync()
        {
            return await VideoRentalStoreService.GetVideosAsync();
        }

        [HttpGet]
        [Route("GetVideoRentals")]
        public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
        {
            return await VideoRentalStoreService.GetVideoRentalsAsync();
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<UserResult> GetUserAsync(string id)
        {
            return await VideoRentalStoreService.GetUserAsync(id);
        }

        [HttpGet]
        [Route("GetVideo/{id}")]
        public async Task<VideoResult> GetVideoAsync(string id)
        {
            return await VideoRentalStoreService.GetVideoAsync(id);
        }

        [HttpGet]
        [Route("GetVideoRental/{id}")]
        public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
        {
            return await VideoRentalStoreService.GetVideoRentalAsync(id);
        }

        [HttpPost]
        [Route("InsertUser")]
        public async Task InsertUserAsync(UserCriteria criteria)
        {
            await VideoRentalStoreService.CreateUserAsync(criteria);
        }

        [HttpPost]
        [Route("InsertVideo")]
        public async Task InsertVideoAsync(VideoCriteria criteria)
        {
            await VideoRentalStoreService.CreateVideoAsync(criteria);
        }

        [HttpPost]
        [Route("InsertVideoRental")]
        public async Task InsertVideoRentalAsync(VideoRentalCriteria criteria)
        {
            await VideoRentalStoreService.CreateVideoRentalAsync(criteria);
        }

        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task UpdateUserAsync(string id, UserCriteria criteria)
        {
            await VideoRentalStoreService.UpdateUserAsync(id, criteria);
        }

        [HttpPatch]
        [Route("UpdateVideo/{id}")]
        public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
        {
            await VideoRentalStoreService.UpdateVideoAsync(id, criteria);
        }

        [HttpPatch]
        [Route("UpdateVideoRental/{id}")]
        public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
        {
            await VideoRentalStoreService.UpdateVideoRentalAsync(id, criteria);
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task DeleteUserAsync(string id)
        {
            await VideoRentalStoreService.DeleteUserAsync(id);
        }

        [HttpDelete]
        [Route("DeleteVideo/{id}")]
        public async Task<ActionResult> DeleteVideoAsync(string id)
        {
            bool deleted = await VideoRentalStoreService.DeleteVideoAsync(id);
            return deleted ? Ok(deleted) : Problem($"Video with {nameof(id)}: {id} is rented. Cannot delete rented video", statusCode: (int)HttpStatusCode.BadRequest);
        }

        [HttpDelete]
        [Route("DeleteVideoRental/{id}")]
        public async Task DeleteVideoRentalAsync(string id)
        {
            await VideoRentalStoreService.DeleteVideoRentalAsync(id);
        }

        [HttpGet]
        [Route("SearchVideo/{title}")]
        public async Task<ActionResult> SearchVideoAsync(string title)
        {
            List <VideoResult> videos = await VideoRentalStoreService.SearchVideoAsync(title);
            if (videos == null || videos.Count == 0)
            {
                return NotFound();
            }
            return Ok(videos);
        }
    }
}
