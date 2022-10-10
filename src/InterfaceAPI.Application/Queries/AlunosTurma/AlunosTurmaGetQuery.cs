
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class AlunosTurmaGetQuery : IRequest<AlunosTurmaDto>
    {
        public long Id { get; set; }
    }
}
