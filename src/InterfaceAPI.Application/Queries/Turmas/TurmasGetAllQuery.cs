
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class TurmasGetAllQuery : IRequest<Page<TurmasDto>>
    {
        public IPageable Page { get; set; }
    }
}
