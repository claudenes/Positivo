
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosCreateCommand : IRequest<Alunos>
    {
        public AlunosDto AlunosDto { get; set; }
    }
}
