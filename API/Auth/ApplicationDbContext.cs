using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;

namespace API.Auth
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Cart>()
            .Property(c => c.Id)
            .ValueGeneratedOnAdd();

            base.OnModelCreating(builder);

            //builder.Entity<AppRole>()
            //    .HasNoKey();

            //builder.Entity<AppUserRole>()
            //    .HasNoKey();
        }

        public DbSet<AppUser>? Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Cart> Carts { get; set; }
    }
}