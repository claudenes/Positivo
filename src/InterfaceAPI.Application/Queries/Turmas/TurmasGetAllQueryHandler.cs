
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
    public class TurmasGetAllQueryHandler : IRequestHandler<TurmasGetAllQuery, Page<TurmasDto>>
    {
        private IReadOnlyTurmasRepository _turmasRepository;
        private readonly IMapper _mapper;

        public TurmasGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyTurmasRepository turmasRepository)
        {
            _mapper = mapper;
            _turmasRepository = turmasRepository;
        }

        public async Task<Page<TurmasDto>> Handle(TurmasGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _turmasRepository.QueryHelper()
                .Include(turmas => turmas.NiveisEnsino)
                .Include(turmas => turmas.UnidadesFisicas)
                .GetPageAsync(request.Page);
            return new Page<TurmasDto>(page.Content.Select(entity => _mapper.Map<TurmasDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
