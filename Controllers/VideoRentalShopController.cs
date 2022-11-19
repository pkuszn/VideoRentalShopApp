using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Get()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public async Task<IActionResult> Put()
        {
            throw new NotImplementedException();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            throw new NotImplementedException();
        }
    }
}
