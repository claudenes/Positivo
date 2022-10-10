using Positivo.InterfaceAPI.Domain;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountActivateCommand : IRequest<User>
    {
        public string Key { get; set; }
    }
}
