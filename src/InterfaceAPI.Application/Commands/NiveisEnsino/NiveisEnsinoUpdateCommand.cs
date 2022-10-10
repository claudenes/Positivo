
using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class NiveisEnsinoUpdateCommand : IRequest<NiveisEnsino>
    {
        public NiveisEnsinoDto NiveisEnsinoDto { get; set; }
    }
}
