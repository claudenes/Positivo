
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class InterfaceIntegracaoUpdateCommand : IRequest<InterfaceIntegracao>
    {
        public InterfaceIntegracaoDto InterfaceIntegracaoDto { get; set; }
    }
}
