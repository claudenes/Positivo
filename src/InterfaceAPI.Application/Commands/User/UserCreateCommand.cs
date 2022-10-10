using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UserCreateCommand : IRequest<User>
    {
        public UserDto UserDto { get; set; }
    }
}
