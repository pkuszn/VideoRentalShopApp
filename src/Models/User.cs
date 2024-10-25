using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System;

namespace VideoRentalStoreApp.Models;

[Collection("user")]
public class User
{
    public ObjectId Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Address { get; set; }
    public long Contact { get; set; }
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public DateTime RegistrationDate { get; set; }
}
