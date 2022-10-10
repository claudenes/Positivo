
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
    public class AlunosGetQueryHandler : IRequestHandler<AlunosGetQuery, AlunosDto>
    {
        private IReadOnlyAlunosRepository _alunosRepository;
        private readonly IMapper _mapper;

        public AlunosGetQueryHandler(
            IMapper mapper,
            IReadOnlyAlunosRepository alunosRepository)
        {
            _mapper = mapper;
            _alunosRepository = alunosRepository;
        }

        public async Task<AlunosDto> Handle(AlunosGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _alunosRepository.QueryHelper()
                .Include(alunos => alunos.NiveisEnsino)
                .Include(alunos => alunos.UnidadesFisicas)
                .GetOneAsync(alunos => alunos.Id == request.Id);
            return _mapper.Map<AlunosDto>(entity);
        }
    }
}
