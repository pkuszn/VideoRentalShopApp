using System.Collections.Generic;

namespace VideoRentalStoreApp.DataTransferObjects.Results;

public class VideoRentalResult
{
    public string Id { get; init; } = null!;
    public string UserId { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public List<VideoRentResult> Videos { get; init; } = null!;
}
