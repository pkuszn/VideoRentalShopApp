using System;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace VideoRentalStoreApp.Models;
internal class VideoRentalStoreDbContext : DbContext
{
    public DbSet<Video> Videos { get; init; }
    public DbSet<User> Users { get; init; }
    public DbSet<VideoRental> VideoRentals { get; init; }
    public VideoRentalStoreDbContext(DbContextOptions options)
        : base(options) { }

    public static VideoRentalStoreDbContext Create(IMongoDatabase db)
    {
        return new(new DbContextOptionsBuilder<VideoRentalStoreDbContext>()
            .UseMongoDB(db.Client, db.DatabaseNamespace.DatabaseName)
            .Options);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Video>();
        modelBuilder.Entity<User>();
        modelBuilder.Entity<VideoRental>();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
#if DEBUG
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.EnableSensitiveDataLogging();
        optionsBuilder.LogTo(Console.WriteLine, minimumLevel: Microsoft.Extensions.Logging.LogLevel.Information);
#endif
    }
}
