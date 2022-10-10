
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
    public class NiveisEnsinoGetAllQueryHandler : IRequestHandler<NiveisEnsinoGetAllQuery, Page<NiveisEnsinoDto>>
    {
        private IReadOnlyNiveisEnsinoRepository _niveisEnsinoRepository;
        private readonly IMapper _mapper;

        public NiveisEnsinoGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyNiveisEnsinoRepository niveisEnsinoRepository)
        {
            _mapper = mapper;
            _niveisEnsinoRepository = niveisEnsinoRepository;
        }

        public async Task<Page<NiveisEnsinoDto>> Handle(NiveisEnsinoGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _niveisEnsinoRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<NiveisEnsinoDto>(page.Content.Select(entity => _mapper.Map<NiveisEnsinoDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
