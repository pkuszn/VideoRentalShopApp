using System;

namespace VideoRentalStoreApp.DataTransferObjects.Results;

public class UserRentedVideosResults
{
    public string Id { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public string? Address { get; init; }
    public long Contact { get; init; }
    public DateTime RegistrationDate { get; init; }
    public string Title { get; init; } = null!;
    public DateTime StartRentalDate { get; init; }
    public DateTime EndRentalDate { get; init; }
    public DateTime? RealEndOfRentalDate { get; init; }
}
