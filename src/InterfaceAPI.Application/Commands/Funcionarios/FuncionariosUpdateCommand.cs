
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class FuncionariosUpdateCommand : IRequest<Funcionarios>
    {
        public FuncionariosDto FuncionariosDto { get; set; }
    }
}
