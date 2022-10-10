
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
    public class AlunosGetAllQueryHandler : IRequestHandler<AlunosGetAllQuery, Page<AlunosDto>>
    {
        private IReadOnlyAlunosRepository _alunosRepository;
        private readonly IMapper _mapper;

        public AlunosGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyAlunosRepository alunosRepository)
        {
            _mapper = mapper;
            _alunosRepository = alunosRepository;
        }

        public async Task<Page<AlunosDto>> Handle(AlunosGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _alunosRepository.QueryHelper()
                .Include(alunos => alunos.NiveisEnsino)
                .Include(alunos => alunos.UnidadesFisicas)
                .GetPageAsync(request.Page);
            return new Page<AlunosDto>(page.Content.Select(entity => _mapper.Map<AlunosDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
