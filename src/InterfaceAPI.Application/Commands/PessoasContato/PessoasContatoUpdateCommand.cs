
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class PessoasContatoUpdateCommand : IRequest<PessoasContato>
    {
        public PessoasContatoDto PessoasContatoDto { get; set; }
    }
}
