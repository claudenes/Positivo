
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class InterfaceIntegracaoGetAllQueryHandler : IRequestHandler<InterfaceIntegracaoGetAllQuery, Page<InterfaceIntegracaoDto>>
    {
        private IReadOnlyInterfaceIntegracaoRepository _interfaceIntegracaoRepository;
        private readonly IMapper _mapper;

        public InterfaceIntegracaoGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyInterfaceIntegracaoRepository interfaceIntegracaoRepository)
        {
            _mapper = mapper;
            _interfaceIntegracaoRepository = interfaceIntegracaoRepository;
        }

        public async Task<Page<InterfaceIntegracaoDto>> Handle(InterfaceIntegracaoGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _interfaceIntegracaoRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<InterfaceIntegracaoDto>(page.Content.Select(entity => _mapper.Map<InterfaceIntegracaoDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
