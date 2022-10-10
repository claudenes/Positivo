using System.Security.Authentication;

namespace Positivo.InterfaceAPI.Crosscutting.Exceptions
{
    public class UserNotActivatedException : AuthenticationException
    {
        public UserNotActivatedException(string message) : base(message)
        {
        }
    }
}
