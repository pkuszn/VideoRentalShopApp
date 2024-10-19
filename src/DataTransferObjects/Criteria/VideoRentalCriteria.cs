using System.Collections.Generic;
using VideoRentalStoreApp.DataTransferObjects.Criteria;

namespace VideoRentalStoreApp.DataTransferObjects;

public class VideoRentalCriteria
{
    public string UserId { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public List<VideoRentCriteria> Videos { get; init; } = null!;
}
