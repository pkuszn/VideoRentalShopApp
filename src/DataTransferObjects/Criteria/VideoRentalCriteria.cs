using System.Collections.Generic;
using VideoRentalShopApp.DataTransferObjects.Criteria;

namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoRentalCriteria
    {
        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<VideoRentCriteria> Videos { get; set; }
    }
}
