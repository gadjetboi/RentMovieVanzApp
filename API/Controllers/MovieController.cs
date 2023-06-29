using API.Auth;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : APIBaseController
    {
        private readonly ApplicationDbContext _dbContext;
        public MovieController(ApplicationDbContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieModel>>> GetMovies()
        {

            try
            {
                var results = await (from u in _dbContext.Movies
                                     select new MovieModel()
                                     {
                                         Id = u.Id,
                                         Title = u.Title,
                                         Description = u.Description,
                                         MainPhotoPath = u.MainPhotoPath
                                     }).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieModel>> GetMovie(int id)
        {

            try
            {
                var result = await (from u in _dbContext.Movies
                                    where u.Id == id
                                    select new MovieModel()
                                    {
                                        Id = u.Id,
                                        Title = u.Title,
                                        Description = u.Description,
                                        MainPhotoPath = u.MainPhotoPath
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
