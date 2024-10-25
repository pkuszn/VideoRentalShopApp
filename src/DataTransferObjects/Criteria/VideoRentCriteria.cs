using System;

namespace VideoRentalStoreApp.DataTransferObjects.Criteria;

public class VideoRentCriteria
{
    public string Title { get; init; } = null!;
    public DateTime StartRentalDate { get; init; }
    public DateTime EndRentalDate { get; init; }
    public DateTime? RealEndOfRentalDate { get; init; }
}
