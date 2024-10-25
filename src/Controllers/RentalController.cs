using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoRentalStoreApp.DataTransferObjects;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;

namespace VideoRentalStoreApp.Controllers;

[Route("[controller]")]
[ApiController]
public class RentalController : ControllerBase
{
    private readonly IRentalService RentalService;
    public RentalController(IRentalService rentalService)
    {
        RentalService = rentalService ?? throw new ArgumentNullException(nameof(rentalService));
    }

    [HttpGet]
    [Route("GetVideoRentals")]
    public async Task<List<VideoRentalResult>> GetVideoRentalsAsync()
    {
        return await RentalService.GetVideoRentalsAsync();
    }

    [HttpGet]
    [Route("GetVideoRental/{id}")]
    public async Task<VideoRentalResult> GetVideoRentalAsync(string id)
    {
        return await RentalService.GetVideoRentalAsync(id);
    }

    [HttpGet]
    [Route("GetListOfRents")]
    public async Task<List<UserRentedVideosResults>> GetListOfRentsAsync()
    {
        return await RentalService.GetListOfUserWithRentedVideosAsync();
    }

    [HttpPost]
    [Route("InsertVideoRental")]
    public async Task InsertVideoRentalAsync(VideoRentalCriteria criteria)
    {
        await RentalService.CreateVideoRentalAsync(criteria);
    }

    [HttpPost]
    [Route("RentFilmByNames")]
    public async Task<bool> RentVideoAsyncByNames(RentFilmByNamesCriteria criteria)
    {
        return await RentalService.RentVideoByNamesAsync(criteria);
    }

    [HttpPost]
    [Route("RentFilmById")]
    public async Task<bool> RentVideoAsyncById(RentFilmByIdCriteria criteria)
    {
        return await RentalService.RentVideoByIdAsync(criteria);
    }

    [HttpPut]
    [Route("ReturnRentedVideoById")]
    public async Task<bool> ReturnRentedVideoByIdAsync(RentFilmByIdCriteria criteria)
    {
        return await RentalService.ReturnRentedVideoByIdAsync(criteria);
    }

    [HttpPut]
    [Route("ReturnRentedVideoByNames")]
    public async Task<bool> ReturnRentedVideByNamesAsync(RentFilmByNamesCriteria criteria)
    {
        return await RentalService.ReturnRentedVideoByNamesAsync(criteria);
    }

    [HttpPatch]
    [Route("UpdateVideoRental/{id}")]
    public async Task UpdateVideoRentalAsync(string id, VideoRentalCriteria criteria)
    {
        await RentalService.UpdateVideoRentalAsync(id, criteria);
    }

    [HttpDelete]
    [Route("DeleteVideoRental/{id}")]
    public async Task DeleteVideoRentalAsync(string id)
    {
        await RentalService.DeleteVideoRentalAsync(id);
    }
}
