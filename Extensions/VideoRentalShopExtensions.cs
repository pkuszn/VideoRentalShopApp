using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using VideoRentalShopApp.Configuration;
using VideoRentalShopApp.Interfaces;
using VideoRentalShopApp.Services;

namespace VideoRentalShopApp.Extensions
{
    public static class VideoRentalShopExtensions
    {
        public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Configure<VideoRentalShopConfiguration>(configuration.GetSection("VideoRentalShop"));   
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSingletonServices(configuration)
                .AddScopedServices();
        }

        private static IServiceCollection AddSingletonServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSingleton<IMongoClient>(s => new MongoClient(configuration.GetSection("VideoRentalShopDb").Value));
        }

        private static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            return services.AddScoped<IVideoRentalShopService, VideoRentalShopService>();
        }
    }
}
