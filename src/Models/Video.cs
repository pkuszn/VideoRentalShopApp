using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace VideoRentalShopApp.Models
{
    public class Video
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int Runtime { get; set; }
        public double Score { get; set; }
        public string Description { get; set; }
        public List<string> Actors { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
