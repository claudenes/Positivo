
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class ProfessoresTurmaGetQuery : IRequest<ProfessoresTurmaDto>
    {
        public long Id { get; set; }
    }
}
