using Positivo.InterfaceAPI.Domain;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UserDeleteCommand : IRequest<Unit>
    {
        public string Login { get; set; }
    }
}
