using Positivo.InterfaceAPI.Domain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountGetAuthenticatedQueryHandler : IRequestHandler<AccountGetAuthenticatedQuery, string>
    {
        private readonly UserManager<User> _userManager;

        public AccountGetAuthenticatedQueryHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public Task<string> Handle(AccountGetAuthenticatedQuery command, CancellationToken cancellationToken)
        {
            return Task.FromResult(_userManager.GetUserName(command.User));
        }
    }
}
