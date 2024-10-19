using System;

namespace VideoRentalStoreApp.DataTransferObjects.Results;

public class UserResult
{
    public string Id { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public string? Address { get; init; } 
    public long Contact { get; init; }
    public DateTime RegistrationDate { get; init; }
}
