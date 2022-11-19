using System;

namespace VideoRentalShopApp.DataTransferObjects.Results
{
    public class VideoRentResult
    {
        public string Title { get; set; }
        //ISODate
        public DateTime StartRentalDate { get; set; }
        //ISODate
        public DateTime EndRentalDate { get; set; }
        //ISODate
        public DateTime? RealEndOfRentalDate { get; set; }
    }
}
