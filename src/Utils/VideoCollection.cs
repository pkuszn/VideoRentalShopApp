using System.Collections.Generic;
using System.Linq;
using VideoRentalShopApp.Models;

namespace VideoRentalShopApp.Utils
{
    public class VideoCollection
    {
        public List<Video> AvailableVideoList { get; set; }

        public VideoCollection(List<Video> videos, List<VideoRental> videoRentals)
        {
            List<string> videoTitles = videoRentals.SelectMany(m => m.Videos.Select(s => s.Title)).ToList();
            AvailableVideoList = videos.Where(w => !videoTitles.Contains(w.Title)).ToList();
        }
    }
}
