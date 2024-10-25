using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace VideoRentalStoreApp;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args)
            .Build()
            .Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>

        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                string? certPath = Environment.GetEnvironmentVariable("CERTIFICATE_FILE");
                string? certPassword = Environment.GetEnvironmentVariable("CERTIFICATE_PASSWORD");
                Console.WriteLine($"Loaded certificate from {certPath}...");
                if (!string.IsNullOrEmpty(certPath) && !string.IsNullOrEmpty(certPassword))
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.ListenAnyIP(6001, listenOptions =>
                           {
                               try
                               {
                                   listenOptions.UseHttps(certPath, certPassword);
                               }
                               catch (Exception ex)
                               {
                                   Console.WriteLine($"Failed to load certificate: {ex.Message}");
                               }
                           });
                        options.ListenAnyIP(6000); // HTTP
                    });
                }
            });

}
