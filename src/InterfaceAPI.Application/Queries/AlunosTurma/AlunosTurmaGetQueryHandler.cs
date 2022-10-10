
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
    public class AlunosTurmaGetQueryHandler : IRequestHandler<AlunosTurmaGetQuery, AlunosTurmaDto>
    {
        private IReadOnlyAlunosTurmaRepository _alunosTurmaRepository;
        private readonly IMapper _mapper;

        public AlunosTurmaGetQueryHandler(
            IMapper mapper,
            IReadOnlyAlunosTurmaRepository alunosTurmaRepository)
        {
            _mapper = mapper;
            _alunosTurmaRepository = alunosTurmaRepository;
        }

        public async Task<AlunosTurmaDto> Handle(AlunosTurmaGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _alunosTurmaRepository.QueryHelper()
                .Include(alunosTurma => alunosTurma.Alunos)
                .Include(alunosTurma => alunosTurma.Turmas)
                .GetOneAsync(alunosTurma => alunosTurma.Id == request.Id);
            return _mapper.Map<AlunosTurmaDto>(entity);
        }
    }
}
