using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.DataTransferObjects.Criteria;
using VideoRentalShopApp.Interfaces;

namespace VideoRentalShopApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoRentalShopController : ControllerBase
    {
        private readonly IVideoRentalShopService VideoRentalShopService;

        public VideoRentalShopController(IVideoRentalShopService videoRentalShopService)
        {
            VideoRentalShopService = videoRentalShopService ?? throw new ArgumentNullException(nameof(videoRentalShopService));
        }

        [HttpPost]
        [Route("RentFilm")]
        public async Task<bool> RentVideoAsync(RentFilmCriteria criteria)
        {
            return await VideoRentalShopService.RentVideoAsync(criteria.Title, criteria.UserId, criteria.FirstName, criteria.LastName);
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
