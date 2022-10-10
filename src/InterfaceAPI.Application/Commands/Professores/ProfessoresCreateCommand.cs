
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresCreateCommand : IRequest<Professores>
    {
        public ProfessoresDto ProfessoresDto { get; set; }
    }
}
