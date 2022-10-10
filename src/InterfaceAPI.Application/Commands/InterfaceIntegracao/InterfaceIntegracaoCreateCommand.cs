
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class InterfaceIntegracaoCreateCommand : IRequest<InterfaceIntegracao>
    {
        public InterfaceIntegracaoDto InterfaceIntegracaoDto { get; set; }
    }
}
