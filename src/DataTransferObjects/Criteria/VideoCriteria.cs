using System.Collections.Generic;

namespace VideoRentalStoreApp.DataTransferObjects.Criteria;

public class VideoCriteria
{
    public string Title { get; init; } = null!;
    public string Genre { get; init; } = null!;
    public string Director { get; init; } = null!; 
    public int Runtime { get; init; }
    public double Score { get; init; }
    public string? Description { get; init; }
    public List<string> Actors { get; init; }= null!;
    public bool IsAvailable { get; init; }
}
