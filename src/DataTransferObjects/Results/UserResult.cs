using System;

namespace VideoRentalShopApp.DataTransferObjects.Results
{
    public class UserResult
    {
        public string? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public long Contact { get; set; }
        //ISODate
        public DateTime RegistrationDate { get; set; }
    }
}
