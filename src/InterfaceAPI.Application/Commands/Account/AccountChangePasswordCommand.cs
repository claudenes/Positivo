using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountChangePasswordCommand : IRequest<Unit>
    {
        public PasswordChangeDto PasswordChangeDto { get; set; }
    }
}
