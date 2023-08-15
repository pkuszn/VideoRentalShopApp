using System;

namespace VideoRentalStoreApp.Models
{
    public class VideoRent
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
