
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresTurmaUpdateCommand : IRequest<ProfessoresTurma>
    {
        public ProfessoresTurmaDto ProfessoresTurmaDto { get; set; }
    }
}
