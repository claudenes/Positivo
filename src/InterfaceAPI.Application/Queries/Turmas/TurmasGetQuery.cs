
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class TurmasGetQuery : IRequest<TurmasDto>
    {
        public long Id { get; set; }
    }
}
