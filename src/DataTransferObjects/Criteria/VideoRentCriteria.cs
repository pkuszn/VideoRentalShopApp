using System;

namespace VideoRentalStoreApp.DataTransferObjects.Criteria
{
    public class VideoRentCriteria
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
