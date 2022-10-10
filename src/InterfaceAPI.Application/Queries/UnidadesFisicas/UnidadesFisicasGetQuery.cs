
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class UnidadesFisicasGetQuery : IRequest<UnidadesFisicasDto>
    {
        public long Id { get; set; }
    }
}
