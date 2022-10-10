using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountResetPasswordCommand : IRequest<Unit>
    {
        public string Mail { get; set; }
    }
}
