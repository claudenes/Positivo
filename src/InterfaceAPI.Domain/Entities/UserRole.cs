using Microsoft.AspNetCore.Identity;

namespace Positivo.InterfaceAPI.Domain
{
    public class UserRole : IdentityUserRole<string>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
