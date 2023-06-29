using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppRole
    {
        [NotMapped]
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}