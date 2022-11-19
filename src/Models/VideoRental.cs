using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace VideoRentalShopApp.Models
{
    public class VideoRental
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        //ISODate
        public DateTime StartRentalDate { get; set; }
        //ISODate
        public DateTime EndRentalDate { get; set; }
        //ISODate
        public DateTime? RealEndOfRentalDate { get; set; }
    }
}
