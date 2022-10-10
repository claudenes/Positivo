
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class FuncionariosCreateCommand : IRequest<Funcionarios>
    {
        public FuncionariosDto FuncionariosDto { get; set; }
    }
}
