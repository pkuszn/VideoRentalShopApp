namespace VideoRentalStoreApp.DataTransferObjects.Criteria;

public class UserCriteria
{
    public string FirstName { get; init; } = null!;
     public string LastName { get; init; } = null!;
    public string Address { get; init; } = null!;
    public long Contact { get; init; }
}
