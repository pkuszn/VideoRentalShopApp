using System;

namespace VideoRentalStoreApp.Models;

public class VideoRent
{
    public string Title { get; set; } = null!;
    public DateTime StartRentalDate { get; set; }
    public DateTime EndRentalDate { get; set; }
    public DateTime? RealEndOfRentalDate { get; set; }
}
