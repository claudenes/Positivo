
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
    public class AlunosTurmaGetAllQueryHandler : IRequestHandler<AlunosTurmaGetAllQuery, Page<AlunosTurmaDto>>
    {
        private IReadOnlyAlunosTurmaRepository _alunosTurmaRepository;
        private readonly IMapper _mapper;

        public AlunosTurmaGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyAlunosTurmaRepository alunosTurmaRepository)
        {
            _mapper = mapper;
            _alunosTurmaRepository = alunosTurmaRepository;
        }

        public async Task<Page<AlunosTurmaDto>> Handle(AlunosTurmaGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _alunosTurmaRepository.QueryHelper()
                .Include(alunosTurma => alunosTurma.Alunos)
                .Include(alunosTurma => alunosTurma.Turmas)
                .GetPageAsync(request.Page);
            return new Page<AlunosTurmaDto>(page.Content.Select(entity => _mapper.Map<AlunosTurmaDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
