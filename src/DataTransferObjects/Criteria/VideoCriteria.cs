using System.Collections.Generic;

namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoCriteria
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int Runtime { get; set; }
        public double Score { get; set; }
        public string Description { get; set; }
        public List<string> Actors { get; set; }
        public bool IsAvailable { get; set; }
    }
}
