namespace VideoRentalStoreApp.DataTransferObjects.Results;

public class VideoShortResult
{
    public string Id { get; init; } = null!;
    public string Title { get; init; } = null!;
    public string Genre { get; init; } = null!;
    public string Director { get; init; } = null!;
    public int Runtime { get; init; }
    public bool IsAvailable { get; init; }
}
