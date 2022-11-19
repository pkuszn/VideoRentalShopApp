using System;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.DataTransferObjects.Results
{
    public class VideoRentalResult
    {
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
