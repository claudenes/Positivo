
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class FuncionariosGetQuery : IRequest<FuncionariosDto>
    {
        public long Id { get; set; }
    }
}
