using Positivo.InterfaceAPI.Domain;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
