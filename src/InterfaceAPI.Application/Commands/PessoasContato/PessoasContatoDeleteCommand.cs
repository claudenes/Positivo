using Positivo.InterfaceAPI.Domain;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class PessoasContatoDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
