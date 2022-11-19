using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace VideoRentalShopApp.Models
{
    public class VideoRental
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public DateTime StartRentalDate { get; set; }
        public DateTime EndRentalDate { get; set; }
        public DateTime RealEndOfRentalDate { get; set; }
    }
}
