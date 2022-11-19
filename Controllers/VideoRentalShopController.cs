using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using VideoRentalShopApp.DataTransferObjects;
using VideoRentalShopApp.Interfaces;

namespace VideoRentalShopApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoRentalShopController : ControllerBase
    {
        private readonly ILogger<VideoRentalShopController> Logger;
        private readonly IVideoRentalShopService VideoRentalShopService;

        public VideoRentalShopController(ILogger<VideoRentalShopController> logger, IVideoRentalShopService videoRentalShopService)
        {
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
            VideoRentalShopService = videoRentalShopService ?? throw new ArgumentNullException(nameof(videoRentalShopService));
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsersAsync()
        {
            return await VideoRentalShopService.GetUsersAsync() as IActionResult;
        }        
        
        [HttpGet]
        [Route("GetVideos")]
        public async Task<IActionResult> GetVideosAsync()
        {
            return await VideoRentalShopService.GetVideosAsync() as IActionResult;
        }

        [HttpGet]
        [Route("GetVideoRentals")]
        public async Task<IActionResult> GetVideoRentalsAsync()
        {
            return await VideoRentalShopService.GetVideoRentalsAsync() as IActionResult;
        }

        [HttpGet("{id}", Name="Get")]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUserAsync(string id)
        {
            return await VideoRentalShopService.GetUserAsync(id) as IActionResult;
        }

        [HttpGet("{id}", Name = "Get")]
        [Route("GetVideos")]
        public async Task<IActionResult> GetVideoAsync(string id)
        {
            return await VideoRentalShopService.GetVideoAsync(id) as IActionResult;
        }

        [HttpGet("{id}", Name = "Get")]
        [Route("GetVideoRentals")]
        public async Task<IActionResult> GetVideoRentalAsync(string id)
        {
            return await VideoRentalShopService.GetVideoRentalAsync(id) as IActionResult;
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

        [HttpPut("{id}", Name = "Put")]
        [Route("UpdateUser")]
        public async Task UpdateUserAsync(string id, UserCriteria criteria)
        {
            await VideoRentalShopService.UpdateUserAsync(id, criteria);
        }

        [HttpPut("{id}", Name = "Put")]
        [Route("UpdateVideo")]
        public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
        {
            await VideoRentalShopService.UpdateVideoAsync(id, criteria);
        }

        [HttpPut("{id}", Name = "Put")]
        [Route("UpdateVideoRental")]
        public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
        {
            await VideoRentalShopService.UpdateVideoRentalAsync(id, criteria);
        }

        [HttpDelete("{id}", Name = "Delete")]
        [Route("DeleteUser")]
        public async Task DeleteUserAsync(string id)
        {
            await VideoRentalShopService.DeleteUserAsync(id);
        }

        [HttpDelete("{id}", Name = "Delete")]
        [Route("DeleteVideo")]
        public async Task DeleteVideoAsync(string id)
        {
            await VideoRentalShopService.DeleteVideoAsync(id);
        }

        [HttpDelete("{id}", Name = "Delete")]
        [Route("DeleteVideoRental")]
        public async Task DeleteVideoRentalAsync(string id)
        {
            await VideoRentalShopService.DeleteVideoRentalAsync(id);
        }
    }
}
