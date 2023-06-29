using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUserRole
    {
        [NotMapped]
        public AppUser User { get; set; }
        [NotMapped]
        public AppRole Role { get; set; }
    }
}