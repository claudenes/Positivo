
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosUpdateCommand : IRequest<Alunos>
    {
        public AlunosDto AlunosDto { get; set; }
    }
}
