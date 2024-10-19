namespace VideoRentalStoreApp.Configuration;

public class VideoRentalStoreConfiguration
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserCollectionName { get; set; } = null!;
    public string VideoCollectionName { get; set; } = null!;
    public string RentalCollectionName { get; set; } = null!;
}

