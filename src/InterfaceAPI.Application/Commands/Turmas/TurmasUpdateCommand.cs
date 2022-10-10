
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class TurmasUpdateCommand : IRequest<Turmas>
    {
        public TurmasDto TurmasDto { get; set; }
    }
}
