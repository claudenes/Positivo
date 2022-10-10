
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UnidadesFisicasCreateCommand : IRequest<UnidadesFisicas>
    {
        public UnidadesFisicasDto UnidadesFisicasDto { get; set; }
    }
}
