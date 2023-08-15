using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Threading.Tasks;
using Xunit;


namespace VideoRentaShopApp.Tests
{
    public class Tests
    {
        [Fact]
        public async Task GetVideosAsync_NotEmpty_True()
        {
            using WebApplicationFactory<VideoRentalStoreApp.Startup> app = new WebApplicationFactory<VideoRentalStoreApp.Startup>();
            using System.Net.Http.HttpClient client = app.CreateClient();

            System.Net.Http.HttpResponseMessage response = await client.GetAsync("/VideoRentalShop/GetVideos");
            
            response.Content.Should().NotBeNull();
        }

        [Fact]
        public async Task GetUsersAsync_NotEmpty_True()
        {
            using WebApplicationFactory<VideoRentalStoreApp.Startup> app = new WebApplicationFactory<VideoRentalStoreApp.Startup>();
            using System.Net.Http.HttpClient client = app.CreateClient();

            System.Net.Http.HttpResponseMessage response = await client.GetAsync("/VideoRentalShop/GetUsers");

            response.Content.Should().NotBeNull();
        }
    }
}
