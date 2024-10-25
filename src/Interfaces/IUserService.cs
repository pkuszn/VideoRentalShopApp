using System.Collections.Generic;
using System.Threading.Tasks;
using VideoRentalStoreApp.DataTransferObjects.Criteria;
using VideoRentalStoreApp.DataTransferObjects.Results;

namespace VideoRentalStoreApp.Interfaces;
public interface IUserService
{
    Task<List<UserResult>> GetUsersWhoHaveRentedMovies();
    Task<List<LoginResult>> GetLoginUsers();
    Task<List<UserResult>> GetUsersAsync();
    Task<UserResult> GetUserAsync(string id);
    Task<string> CreateUserAsync(UserCriteria criteria);
    Task UpdateUserAsync(string id, UserCriteria criteria);
    Task DeleteUserAsync(string id);

}
