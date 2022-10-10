using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UserUpdateCommand : IRequest<User>
    {
        public UserDto UserDto { get; set; }
    }
}
