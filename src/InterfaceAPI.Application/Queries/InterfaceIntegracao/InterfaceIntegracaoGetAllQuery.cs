
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class InterfaceIntegracaoGetAllQuery : IRequest<Page<InterfaceIntegracaoDto>>
    {
        public IPageable Page { get; set; }
    }
}
