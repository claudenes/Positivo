
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class AlunosGetQuery : IRequest<AlunosDto>
    {
        public long Id { get; set; }
    }
}
