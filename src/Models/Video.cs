using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace VideoRentalStoreApp.Models;

[Collection("video")]
public class Video
{
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    public string Genre { get; set; } = null!;
    public string Director { get; set; } = null!;
    public int Runtime { get; set; }
    public double Score { get; set; }
    public string Description { get; set; } = null!;
    public List<string>? Actors { get; set; } 
    public DateTime CreatedDate { get; set; }
    public bool IsAvailable { get; set; }
}
