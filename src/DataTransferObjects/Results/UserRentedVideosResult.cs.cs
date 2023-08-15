using System;

namespace VideoRentalStoreApp.DataTransferObjects
{
    public class UserRentedVideosResults
    {
        public string? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public long Contact { get; set; }
        //ISODate
        public DateTime RegistrationDate { get; set; }
        public string Title { get; set; }
        public DateTime StartRentalDate { get; set; }
        //ISODate
        public DateTime EndRentalDate { get; set; }
        //ISODate
        public DateTime? RealEndOfRentalDate { get; set; }
    }
}
