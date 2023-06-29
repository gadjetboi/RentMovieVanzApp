using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Auth
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Entity<AppRole>()
            //    .HasNoKey();

            //builder.Entity<AppUserRole>()
            //    .HasNoKey();
        }

        public DbSet<AppUser>? Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
    }
}