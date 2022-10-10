
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class ProfessoresTurmaGetQueryHandler : IRequestHandler<ProfessoresTurmaGetQuery, ProfessoresTurmaDto>
    {
        private IReadOnlyProfessoresTurmaRepository _professoresTurmaRepository;
        private readonly IMapper _mapper;

        public ProfessoresTurmaGetQueryHandler(
            IMapper mapper,
            IReadOnlyProfessoresTurmaRepository professoresTurmaRepository)
        {
            _mapper = mapper;
            _professoresTurmaRepository = professoresTurmaRepository;
        }

        public async Task<ProfessoresTurmaDto> Handle(ProfessoresTurmaGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _professoresTurmaRepository.QueryHelper()
                .Include(professoresTurma => professoresTurma.Professores)
                .Include(professoresTurma => professoresTurma.Turmas)
                .GetOneAsync(professoresTurma => professoresTurma.Id == request.Id);
            return _mapper.Map<ProfessoresTurmaDto>(entity);
        }
    }
}
