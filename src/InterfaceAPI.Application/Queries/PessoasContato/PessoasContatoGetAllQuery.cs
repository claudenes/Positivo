
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class PessoasContatoGetAllQuery : IRequest<Page<PessoasContatoDto>>
    {
        public IPageable Page { get; set; }
    }
}
