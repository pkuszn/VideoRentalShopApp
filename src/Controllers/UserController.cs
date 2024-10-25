using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;

namespace VideoRentalStoreApp.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService UserService;
    public UserController(IUserService userService)
    {
        UserService = userService ?? throw new ArgumentNullException(nameof(userService));
    }
    
    [HttpGet]
    [Route("GetLoginUsers")]
    public async Task<List<LoginResult>> GetLoginResultsAsync()
    {
        return await UserService.GetLoginUsers();
    }

    [HttpGet]
    [Route("GetUsersWhoHaveRentedVideos")]
    public async Task<List<UserResult>> GetUsersWhoHaveRentedVideos()
    {
        return await UserService.GetUsersWhoHaveRentedMovies();
    }

    [HttpGet]
    [Route("GetUsers")]
    public async Task<List<UserResult>> GetUsersAsync()
    {
        return await UserService.GetUsersAsync();
    }
    
    [HttpGet]
    [Route("GetUser/{id}")]
    public async Task<UserResult> GetUserAsync(string id)
    {
        return await UserService.GetUserAsync(id);
    }

    [HttpPost]
    [Route("InsertUser")]
    public async Task InsertUserAsync(UserCriteria criteria)
    {
        await UserService.CreateUserAsync(criteria);
    }

    [HttpPatch]
    [Route("UpdateUser/{id}")]
    public async Task UpdateUserAsync(string id, UserCriteria criteria)
    {
        await UserService.UpdateUserAsync(id, criteria);
    }        

    [HttpDelete]
    [Route("DeleteUser/{id}")]
    public async Task DeleteUserAsync(string id)
    {
        await UserService.DeleteUserAsync(id);
    }
}
