
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
    public class ProfessoresGetAllQueryHandler : IRequestHandler<ProfessoresGetAllQuery, Page<ProfessoresDto>>
    {
        private IReadOnlyProfessoresRepository _professoresRepository;
        private readonly IMapper _mapper;

        public ProfessoresGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyProfessoresRepository professoresRepository)
        {
            _mapper = mapper;
            _professoresRepository = professoresRepository;
        }

        public async Task<Page<ProfessoresDto>> Handle(ProfessoresGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _professoresRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<ProfessoresDto>(page.Content.Select(entity => _mapper.Map<ProfessoresDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
