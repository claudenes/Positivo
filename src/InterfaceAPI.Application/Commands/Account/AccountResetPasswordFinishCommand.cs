using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountResetPasswordFinishCommand : IRequest<User>
    {
        public KeyAndPasswordDto KeyAndPasswordDto { get; set; }
    }
}
