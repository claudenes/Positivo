
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class ProfessoresGetQuery : IRequest<ProfessoresDto>
    {
        public long Id { get; set; }
    }
}
