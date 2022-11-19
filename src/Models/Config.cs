using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VideoRentalShopApp.Models
{
    public class Config
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }
        public int RentVideoLimit { get; set; }
    }
}
