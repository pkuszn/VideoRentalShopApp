using System.Collections.Generic;
using System.Linq;
using VideoRentalStoreApp.Models;

namespace VideoRentalStoreApp.Utils
{
    internal class VideoCollection
    {
        internal List<Video> AvailableVideoList { get; set; }
        public VideoCollection(List<Video> videos, List<VideoRental> videoRentals)
        {
            List<string> videoTitles = videoRentals.SelectMany(m => m.Videos.Select(s => s.Title)).ToList();
            AvailableVideoList = videos.Where(w => !videoTitles.Contains(w.Title)).ToList();
        }
    }
}
