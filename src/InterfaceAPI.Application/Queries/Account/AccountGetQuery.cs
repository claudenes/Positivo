using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountGetQuery : IRequest<UserDto>
    {
    }
}
