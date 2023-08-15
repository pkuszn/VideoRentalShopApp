using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace VideoRentalStoreApp.Models
{
    public class VideoRental
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<VideoRent> Videos { get; set; }
    }
}
