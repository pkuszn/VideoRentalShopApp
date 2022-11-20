using System.Collections.Generic;

namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoListResult<TResult>
    {
        public List<TResult> VideoList { get; set; }
    }
}
