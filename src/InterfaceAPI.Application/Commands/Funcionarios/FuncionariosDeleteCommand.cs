using Positivo.InterfaceAPI.Domain;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class FuncionariosDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
