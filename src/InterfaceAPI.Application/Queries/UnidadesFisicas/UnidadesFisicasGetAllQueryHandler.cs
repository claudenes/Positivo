
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
    public class UnidadesFisicasGetAllQueryHandler : IRequestHandler<UnidadesFisicasGetAllQuery, Page<UnidadesFisicasDto>>
    {
        private IReadOnlyUnidadesFisicasRepository _unidadesFisicasRepository;
        private readonly IMapper _mapper;

        public UnidadesFisicasGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyUnidadesFisicasRepository unidadesFisicasRepository)
        {
            _mapper = mapper;
            _unidadesFisicasRepository = unidadesFisicasRepository;
        }

        public async Task<Page<UnidadesFisicasDto>> Handle(UnidadesFisicasGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _unidadesFisicasRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<UnidadesFisicasDto>(page.Content.Select(entity => _mapper.Map<UnidadesFisicasDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
