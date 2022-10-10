
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
    public class ProfessoresTurmaGetAllQueryHandler : IRequestHandler<ProfessoresTurmaGetAllQuery, Page<ProfessoresTurmaDto>>
    {
        private IReadOnlyProfessoresTurmaRepository _professoresTurmaRepository;
        private readonly IMapper _mapper;

        public ProfessoresTurmaGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyProfessoresTurmaRepository professoresTurmaRepository)
        {
            _mapper = mapper;
            _professoresTurmaRepository = professoresTurmaRepository;
        }

        public async Task<Page<ProfessoresTurmaDto>> Handle(ProfessoresTurmaGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _professoresTurmaRepository.QueryHelper()
                .Include(professoresTurma => professoresTurma.Professores)
                .Include(professoresTurma => professoresTurma.Turmas)
                .GetPageAsync(request.Page);
            return new Page<ProfessoresTurmaDto>(page.Content.Select(entity => _mapper.Map<ProfessoresTurmaDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
