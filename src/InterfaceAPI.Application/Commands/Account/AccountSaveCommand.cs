using MediatR;
using Positivo.InterfaceAPI.Dto;
using System.Security.Claims;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountSaveCommand : IRequest<Unit>
    {
        public ClaimsPrincipal User { get; set; }
        public UserDto UserDto { get; set; }
    }
}
