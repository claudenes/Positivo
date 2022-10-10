using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountCreateCommand : IRequest<User>
    {
        public ManagedUserDto ManagedUserDto { get; set; }
    }
}
