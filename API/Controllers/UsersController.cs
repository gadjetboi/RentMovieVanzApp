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
            
            var results = await (from u in _dbContext.Users
                        orderby u.FirstName
                        select new UserModel()
                        {
                            Id = u.Id,
                            FirstName = u.FirstName
                        }).ToListAsync();

            return results;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(int id) {
            
            var result = await (from u in _dbContext.Users
                                where u.Id == id
                                select new UserModel()
                                {
                                    Id = u.Id,
                                    FirstName = u.FirstName
                                }).FirstOrDefaultAsync();

            return result;
        }
    }
}