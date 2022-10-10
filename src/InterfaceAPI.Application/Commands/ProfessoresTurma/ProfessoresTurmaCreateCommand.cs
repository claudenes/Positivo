
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresTurmaCreateCommand : IRequest<ProfessoresTurma>
    {
        public ProfessoresTurmaDto ProfessoresTurmaDto { get; set; }
    }
}
