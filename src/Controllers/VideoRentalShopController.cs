using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.DataTransferObjects.Criteria;
using VideoRentalShopApp.DataTransferObjects.Results;
using VideoRentalShopApp.Interfaces;

namespace VideoRentalShopApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoRentalShopController : ControllerBase
    {
        private readonly IVideoRentalShopService VideoRentalShopService;
        private readonly ILogger<VideoRentalShopController> Logger;
        public VideoRentalShopController(IVideoRentalShopService videoRentalShopService, ILogger<VideoRentalShopController> logger)
        {
            VideoRentalShopService = videoRentalShopService ?? throw new ArgumentNullException(nameof(videoRentalShopService));
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Route("GetUsersWhoHaveRentedVideos")]
        public async Task<List<UserResult>> GetUsersWhoHaveRentedVideos()
        {
            return await VideoRentalShopService.GetUsersWhoHaveRentedMovies();
        }

        [HttpGet]
        [Route("GetMyVideos/{id}")]
        public async Task<List<VideoResult>> GetMyVideosAsync(string id)
        {
            return await VideoRentalShopService.GetMyVideosByIdAsync(id);
        }

        [HttpGet]
        [Route("GetLoginUsers")]
        public async Task<List<LoginResult>> GetLoginResultsAsync()
        {
            return await VideoRentalShopService.GetLoginUsers();
        }

        [HttpGet]
        [Route("GetListOfRents")]
        public async Task<List<UserRentedVideosResults>> GetListOfRentsAsync()
        {
            return await VideoRentalShopService.GetListOfUserWithRentedVideosAsync();
        }

        [HttpPut]
        [Route("ReturnRentedVideoById")]
        public async Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria)
        {
            return await VideoRentalShopService.ReturnRentedVideoByIdAsync(criteria);
        }

        [HttpPut]
        [Route("ReturnRentedVideoByNames")]
        public async Task<bool> ReturnRentedVideByNamesAsync(RentFilmByNamesCriteria criteria)
        {
            return await VideoRentalShopService.ReturnRentedVideoByNamesAsync(criteria);
        }

        [HttpGet]
        [Route("GetAvailableVideos")]
        public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
        {
            return await VideoRentalShopService.GetAvailableVideosAsync(sortByTitle, sortByGenre);
        }

        [HttpGet]
        [Route("GetAvailableVideoShort")]
        public async Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre)
        {
            return await VideoRentalShopService.GetAvailableVideosShortAsync(sortByTitle, sortByGenre);
        }

        [HttpPost]
        [Route("RentFilmByNames")]
        public async Task<bool> RentVideoAsyncByNames(RentFilmByNamesCriteria criteria)
        {
            return await VideoRentalShopService.RentVideoByNamesAsync(criteria);
        }

        [HttpPost]
        [Route("RentFilmById")]
        public async Task<bool> RentVideoAsyncById(RentFilmByIdCriteria criteria)
        {
            return await VideoRentalShopService.RentVideoByIdAsync(criteria);
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<List<UserResult>> GetUsersAsync()
        {
            return await VideoRentalShopService.GetUsersAsync();
        }

        [HttpGet]
        [Route("GetVideos")]
        public async Task<List<VideoResult>> GetVideosAsync()
        {
            return await VideoRentalShopService.GetVideosAsync();
        }

        [HttpGet]
        [Route("GetVideoRentals")]
        public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
        {
            return await VideoRentalShopService.GetVideoRentalsAsync();
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<UserResult> GetUserAsync(string id)
        {
            return await VideoRentalShopService.GetUserAsync(id);
        }

        [HttpGet]
        [Route("GetVideo/{id}")]
        public async Task<VideoResult> GetVideoAsync(string id)
        {
            return await VideoRentalShopService.GetVideoAsync(id);
        }

        [HttpGet]
        [Route("GetVideoRental/{id}")]
        public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
        {
            return await VideoRentalShopService.GetVideoRentalAsync(id);
        }

        [HttpPost]
        [Route("InsertUser")]
        public async Task InsertUserAsync(UserCriteria criteria)
        {
            await VideoRentalShopService.CreateUserAsync(criteria);
        }

        [HttpPost]
        [Route("InsertVideo")]
        public async Task InsertVideoAsync(VideoCriteria criteria)
        {
            await VideoRentalShopService.CreateVideoAsync(criteria);
        }

        [HttpPost]
        [Route("InsertVideoRental")]
        public async Task InsertVideoRentalAsync(VideoRentalCriteria criteria)
        {
            await VideoRentalShopService.CreateVideoRentalAsync(criteria);
        }

        [HttpPut]
        [Route("UpdateUser/{id}")]
        public async Task UpdateUserAsync(string id, UserCriteria criteria)
        {
            await VideoRentalShopService.UpdateUserAsync(id, criteria);
        }

        [HttpPut]
        [Route("UpdateVideo/{id}")]
        public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
        {
            await VideoRentalShopService.UpdateVideoAsync(id, criteria);
        }

        [HttpPut]
        [Route("UpdateVideoRental/{id}")]
        public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
        {
            await VideoRentalShopService.UpdateVideoRentalAsync(id, criteria);
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task DeleteUserAsync(string id)
        {
            await VideoRentalShopService.DeleteUserAsync(id);
        }

        [HttpDelete]
        [Route("DeleteVideo/{id}")]
        public async Task DeleteVideoAsync(string id)
        {
            await VideoRentalShopService.DeleteVideoAsync(id);
        }

        [HttpDelete]
        [Route("DeleteVideoRental/{id}")]
        public async Task DeleteVideoRentalAsync(string id)
        {
            await VideoRentalShopService.DeleteVideoRentalAsync(id);
        }
    }
}
