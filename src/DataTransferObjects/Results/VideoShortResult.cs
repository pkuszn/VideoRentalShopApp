namespace VideoRentalShopApp.DataTransferObjects
{
    public class VideoShortResult
    {
        public string? Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int Runtime { get; set; }
        public bool IsAvailable { get; set; }
    }
}
