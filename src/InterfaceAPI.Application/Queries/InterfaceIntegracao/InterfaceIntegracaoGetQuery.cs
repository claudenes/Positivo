
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class InterfaceIntegracaoGetQuery : IRequest<InterfaceIntegracaoDto>
    {
        public long Id { get; set; }
    }
}
