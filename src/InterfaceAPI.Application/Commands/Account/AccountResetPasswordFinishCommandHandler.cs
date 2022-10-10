using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountResetPasswordFinishCommandHandler : IRequestHandler<AccountResetPasswordFinishCommand, User>
    {
        private readonly IUserService _userService;

        public AccountResetPasswordFinishCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public Task<User> Handle(AccountResetPasswordFinishCommand command, CancellationToken cancellationToken)
        {
            return _userService.CompletePasswordReset(command.KeyAndPasswordDto.NewPassword, command.KeyAndPasswordDto.Key);
        }
    }
}
