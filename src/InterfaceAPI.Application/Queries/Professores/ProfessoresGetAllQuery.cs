
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class ProfessoresGetAllQuery : IRequest<Page<ProfessoresDto>>
    {
        public IPageable Page { get; set; }
    }
}
