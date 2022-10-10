
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UnidadesFisicasUpdateCommand : IRequest<UnidadesFisicas>
    {
        public UnidadesFisicasDto UnidadesFisicasDto { get; set; }
    }
}
