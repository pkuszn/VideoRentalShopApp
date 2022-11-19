using System;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoRentalCriteria
    {
        public User User { get; set; }
        public string Title { get; set; }
        public DateTime StartRentalDate { get; set; }
        public DateTime EndRentalDate { get; set; }
        public DateTime? RealEndOfRentalDate { get; set; }
    }
}
