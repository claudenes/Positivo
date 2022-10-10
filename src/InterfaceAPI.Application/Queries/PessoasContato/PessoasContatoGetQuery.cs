
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class PessoasContatoGetQuery : IRequest<PessoasContatoDto>
    {
        public long Id { get; set; }
    }
}
