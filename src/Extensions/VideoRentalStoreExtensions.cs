using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VideoRentalStoreApp.Configuration;
using VideoRentalStoreApp.Interfaces;
using VideoRentalStoreApp.Models;
using VideoRentalStoreApp.Services;

namespace VideoRentalStoreApp.Extensions
{
    public static class VideoRentalStoreExtensions
    {
        public const string VideoRentalStoreConst = "VideoRentalStore";
        public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Configure<VideoRentalStoreConfiguration>(configuration.GetSection(VideoRentalStoreConst));
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddScopedServices();
        }
        private static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            return services.AddScoped<IRentalService, RentalService>()
                .AddScoped<IVideoService, VideoService>()
                .AddScoped<IUserService, UserService>();
        }

        public static IServiceCollection AddDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddDbContext<VideoRentalStoreDbContext>(options =>
                options.UseMongoDB(configuration.GetSection($"{VideoRentalStoreConst}:ConnectionString").Value! ?? "",
                    configuration.GetSection($"{VideoRentalStoreConst}:DatabaseName").Value! ?? "")
            );
        }
    }
}
