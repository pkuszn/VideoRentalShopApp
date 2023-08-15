using System.Collections.Generic;

namespace VideoRentalStoreApp.DataTransferObjects
{
    public class VideoRentalResult
    {
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<VideoRentResult> Videos { get; set; }
    }
}
