using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using VideoRentalStoreApp.Configuration;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Services;

namespace VideoRentalStoreApp.Extensions
{
    public static class VideoRentalStoreExtensions
    {
        public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Configure<VideoRentalStoreConfiguration>(configuration.GetSection("VideoRentalShop"));   
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSingletonServices(configuration)
                .AddScopedServices();
        }

        private static IServiceCollection AddSingletonServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSingleton<IMongoClient>(s => new MongoClient(configuration.GetSection("VideoRentalShop:ConnectionString").Value));
        }

        private static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            return services.AddScoped<IVideoRentalStoreService, VideoRentalStoreService>();
        }
    }
}
