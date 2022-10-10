
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosTurmaCreateCommand : IRequest<AlunosTurma>
    {
        public AlunosTurmaDto AlunosTurmaDto { get; set; }
    }
}
