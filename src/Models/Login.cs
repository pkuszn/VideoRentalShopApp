using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace VideoRentalShopApp.Models
{
    public class Login
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }
        public string User { get; set; }
        public string Password { get; set; }

        //ISODate
        public DateTime DateCreated { get; set; }
    }
}
