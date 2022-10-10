using MediatR;
using Positivo.InterfaceAPI.Dto;
using System.Security.Principal;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UserJwtAuthorizeCommand : IRequest<IPrincipal>
    {
        public LoginDto LoginDto { get; set; }
    }
}
