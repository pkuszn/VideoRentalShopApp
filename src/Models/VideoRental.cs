using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.Collections.Generic;

namespace VideoRentalStoreApp.Models;
[Collection("rental")]
public class VideoRental
{
    public ObjectId Id { get; set; }
    public ObjectId UserId { get; set; } 
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public required List<VideoRent> Videos { get; set; }
}
