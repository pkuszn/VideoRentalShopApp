using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;

namespace VideoRentalStoreApp.Controllers;

[Route("[controller]")]
[ApiController]
public class VideoController : ControllerBase
{
    private readonly IVideoService VideoService;
    public VideoController(IVideoService videoService)
    {
        VideoService = videoService ?? throw new ArgumentNullException(nameof(videoService));
    }

    [HttpGet]
    [Route("GetVideos")]
    public async Task<List<VideoResult>> GetVideosAsync()
    {
        return await VideoService.GetVideosAsync();
    }

    [HttpGet]
    [Route("GetVideo/{id}")]
    public async Task<VideoResult> GetVideoAsync(string id)
    {
        return await VideoService.GetVideoAsync(id);
    }

    [HttpGet]
    [Route("GetMyVideos/{id}")]
    public async Task<List<VideoResult>> GetMyVideosAsync(string id)
    {
        return await VideoService.GetMyVideosByIdAsync(id);
    }

    [HttpGet]
    [Route("GetAvailableVideos")]
    public async Task<List<VideoResult>> GetAvailableVideosAsync(bool sortByTitle, bool sortByGenre)
    {
        return await VideoService.GetAvailableVideosAsync(sortByTitle, sortByGenre);
    }

    [HttpGet]
    [Route("GetAvailableVideoShort")]
    public async Task<List<VideoShortResult>> GetAvailableVideosShortAsync(bool sortByTitle, bool sortByGenre)
    {
        return await VideoService.GetAvailableVideosShortAsync(sortByTitle, sortByGenre);
    }

    [HttpPost]
    [Route("InsertVideo")]
    public async Task InsertVideoAsync(VideoCriteria criteria)
    {
        await VideoService.CreateVideoAsync(criteria);
    }

    [HttpPatch]
    [Route("UpdateVideo/{id}")]
    public async Task UpdateVideoAsync(string id, VideoCriteria criteria)
    {
        await VideoService.UpdateVideoAsync(id, criteria);
    }

    [HttpDelete]
    [Route("DeleteVideo/{id}")]
    public async Task<ActionResult> DeleteVideoAsync(string id)
    {
        bool deleted = await VideoService.DeleteVideoAsync(id);
        return deleted ? Ok(deleted) : Problem($"Video with {nameof(id)}: {id} is rented. Cannot delete rented video", statusCode: (int)HttpStatusCode.BadRequest);
    }

    [HttpGet]
    [Route("SearchVideo/{title}")]
    public async Task<ActionResult> SearchVideoAsync(string title)
    {
        List<VideoResult> videos = await VideoService.SearchVideoAsync(title);
        if (videos == null || videos.Count == 0)
        {
            return NotFound();
        }
        return Ok(videos);
    }
}
