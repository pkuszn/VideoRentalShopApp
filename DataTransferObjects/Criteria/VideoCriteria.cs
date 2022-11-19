using System;
using System.Collections.Generic;

namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoCriteria
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public DateTime Runtime { get; set; }
        public int Score { get; set; }
        public string Description { get; set; }
        public List<string> Actors { get; set; }
    }
}
