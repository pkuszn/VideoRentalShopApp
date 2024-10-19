using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Models;

namespace VideoRentalStoreApp.Services;

internal class UserService : IUserService
{
    private readonly ILogger<UserService> Logger;
    private readonly VideoRentalStoreDbContext DbContext;
    public UserService(VideoRentalStoreDbContext dbContext, ILogger<UserService> logger)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<UserResult>> GetUsersWhoHaveRentedMovies()
    {
        List<VideoRental> videoRentals = await DbContext.VideoRentals
            .Where(q => q.Videos.Any(v => v.RealEndOfRentalDate == null))
            .ToListAsync();

        if (videoRentals == null || videoRentals.Count == 0)
        {
            Logger.LogError($"{nameof(videoRentals)} is null or empty.");
            return null!;
        }

        List<ObjectId> userIds = videoRentals.Select(q => q.UserId).Distinct().ToList();
        List<User> users = await DbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .ToListAsync();

        return users.Select(u => new UserResult
        {
            Id = u.Id.ToString(),
            FirstName = u.FirstName,
            LastName = u.LastName,
            Address = u.Address!,
            Contact = u.Contact,
            RegistrationDate = u.RegistrationDate
        }).ToList();
    }

    public async Task<List<UserResult>> GetUsersAsync()
    {
        List<User> users = await DbContext.Users.ToListAsync();
        if ((users?.Count ?? 0) == 0)
        {
            return null!;
        }

        return users!.Select(s => new UserResult
        {
            Id = s.Id.ToString(),
            FirstName = s.FirstName,
            LastName = s.LastName,
            Address = s.Address!,
            Contact = s.Contact,
            RegistrationDate = s.RegistrationDate
        }).ToList();
    }

    public async Task<UserResult> GetUserAsync(string id)
    {
        User? user = await DbContext.Users.Where(q => q.Id.Equals(new ObjectId(id))).FirstOrDefaultAsync();
        if (user == null)
        {
            Logger.LogError($"{nameof(user)} with id: {id} not found.");
            return null!;
        }
        return new UserResult
        {
            Id = user.Id.ToString(),
            FirstName = user.FirstName,
            LastName = user.LastName,
            Address = user.Address!,
            Contact = user.Contact,
            RegistrationDate = user.RegistrationDate
        };
    }

    public async Task<string> CreateUserAsync(UserCriteria criteria)
    {
        User user = new()
        {
            FirstName = criteria.FirstName,
            LastName = criteria.LastName,
            Address = criteria.Address,
            Contact = criteria.Contact,

            RegistrationDate = DateTime.UtcNow
        };
        await DbContext.Users.AddAsync(user);
        await DbContext.SaveChangesAsync();
        return user.Id.ToString();
    }

    public async Task UpdateUserAsync(string id, UserCriteria criteria)
    {
        User? user = await DbContext.Users.FirstOrDefaultAsync(f => f.Id.Equals(new ObjectId(id)));
        if (user != null)
        {
            user.FirstName = criteria.FirstName;
            user.LastName = criteria.LastName;
            user.Address = criteria.Address;
            user.Contact = criteria.Contact;
            user.RegistrationDate = DateTime.UtcNow;

            await DbContext.SaveChangesAsync();
        }
        else
        {
            Logger.LogError($"User with id {id} not found.");
        }
    }

    public async Task<List<LoginResult>> GetLoginUsers()
    {
        List<LoginResult> loginList = await DbContext.Users
            .Select(u => new LoginResult
            {
                Id = u.Id.ToString(),
                User = u.UserName,
                Password = u.Password
            })
            .ToListAsync();

        return loginList;
    }

    public async Task DeleteUserAsync(string id)
    {
        User? user = await DbContext.Users.FirstOrDefaultAsync(u => u.Id.Equals(new ObjectId(id)));
        if (user != null)
        {
            DbContext.Users.Remove(user);
            await DbContext.SaveChangesAsync();
        }
        else
        {
            Logger.LogError($"User with id {id} not found.");
        }
    }
}