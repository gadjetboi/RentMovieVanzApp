using API.Auth;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : APIBaseController
    {
        private readonly ApplicationDbContext _dbContext;
        public UsersController(ApplicationDbContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers() {

            try {
                var results = await (from u in _dbContext.Users
                                     orderby u.FirstName
                                     select new UserModel()
                                     {
                                         FirstName = u.FirstName,
                                         LastName = u.LastName,
                                         UserName = u.UserName
                                     }).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<UserModel>> GetUser(string userName) {

            try
            {
                var result = await (from u in _dbContext.Users
                                    where u.UserName == userName
                                    select new UserModel()
                                    {
                                        FirstName = u.FirstName,
                                        LastName = u.LastName,
                                        UserName = u.UserName
                                    }).FirstOrDefaultAsync();

                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}