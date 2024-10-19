using System;
using System.Collections.Generic;

namespace VideoRentalStoreApp.DataTransferObjects.Results;

public class VideoResult
{
    public string Id { get; init; } = null!;
    public string Title { get; init; } = null!;
    public string Genre { get; init; } = null!;
    public string Director { get; init; } = null!;
    public int Runtime { get; init; } 
    public double Score { get; init; }
    public string? Description { get; init; }
    public List<string> Actors { get; init; } = null!;
    public DateTime CreatedDate { get; init; }
    public bool IsAvailable { get; init; }
}
