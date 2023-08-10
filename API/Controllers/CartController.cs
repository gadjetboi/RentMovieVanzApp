using API.Auth;
using API.Entities;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {

    public class CartsController : APIBaseController
    {
        private readonly ApplicationDbContext _dbContext;

        public CartsController(ApplicationDbContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartModel>>> GetCarts()
        {
            try
            {
                var results = await (from u in _dbContext.Carts
                                     select new CartModel()
                                     {
                                         Id = u.Id,
                                         Title = u.Title,
                                         Description = u.Description,
                                         MainPhoto = u.MainPhoto,
                                         Price = u.Price
                                     }).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("add-cart")]
        public async Task<ActionResult<CartModel>> AddCart(CartModel cartModel)
        {
            try
            {   
                if (cartModel == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel { Status = "Error", Message = "Please provide the proper details!" });

                var cart = new Cart()
                {
                    Title = cartModel.Title,
                    Description = cartModel.Description,
                    MainPhoto = cartModel.MainPhoto,
                    Price = cartModel.Price
                };

                await _dbContext.Carts.AddAsync(cart);

                await _dbContext.SaveChangesAsync();

                var result = new CartModel()
                {
                    Id = cart.Id,
                    Title = cart.Title,
                    Description = cart.Description,
                    MainPhoto = cart.MainPhoto,
                    Price = cart.Price
                };

                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("remove-cart")]
        public async Task<ActionResult<IEnumerable<CartModel>>> RemoveCarts(CartModel cartModel)
        {
            try
            {
                var cart = _dbContext.Carts.Where(o => o.Id == cartModel.Id).FirstOrDefault();

                if(cart == null)
                    return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel { Status = "Error", Message = "Please provide the proper details!" });

                _dbContext.Carts.Remove(cart);

                await _dbContext.SaveChangesAsync();

                var results = await (from u in _dbContext.Carts
                                     select new CartModel()
                                     {
                                         Id = u.Id,
                                         Title = u.Title,
                                         Description = u.Description,
                                         MainPhoto = u.MainPhoto,
                                         Price = u.Price
                                     }).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
