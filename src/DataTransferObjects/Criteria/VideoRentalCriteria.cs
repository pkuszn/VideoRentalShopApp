using System.Collections.Generic;
using VideoRentalStoreApp.DataTransferObjects.Criteria;

namespace VideoRentalStoreApp.DataTransferObjects
{
    public class VideoRentalCriteria
    {
        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<VideoRentCriteria> Videos { get; set; }
    }
}
