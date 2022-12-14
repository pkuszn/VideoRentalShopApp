using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Threading.Tasks;
using Xunit;


namespace VideoRentaShopApp.Tests
{
    public class Tests
    {
        [Fact]
        public void Test1()
        {
            Console.WriteLine("test");
        }


        [Fact]
        public async Task GetVideosAsync_NotEmpty_True()
        {
            using WebApplicationFactory<VideoRentalShopApp.Startup> app = new WebApplicationFactory<VideoRentalShopApp.Startup>();
            using System.Net.Http.HttpClient client = app.CreateClient();

            System.Net.Http.HttpResponseMessage response = await client.GetAsync("/VideoRentalShop/GetVideos");
            
            response.Content.Should().NotBeNull();
        }
    }
}
