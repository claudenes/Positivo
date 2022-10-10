
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class NiveisEnsinoGetQuery : IRequest<NiveisEnsinoDto>
    {
        public long Id { get; set; }
    }
}
