
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
    public class TurmasGetQueryHandler : IRequestHandler<TurmasGetQuery, TurmasDto>
    {
        private IReadOnlyTurmasRepository _turmasRepository;
        private readonly IMapper _mapper;

        public TurmasGetQueryHandler(
            IMapper mapper,
            IReadOnlyTurmasRepository turmasRepository)
        {
            _mapper = mapper;
            _turmasRepository = turmasRepository;
        }

        public async Task<TurmasDto> Handle(TurmasGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _turmasRepository.QueryHelper()
                .Include(turmas => turmas.NiveisEnsino)
                .Include(turmas => turmas.UnidadesFisicas)
                .GetOneAsync(turmas => turmas.Id == request.Id);
            return _mapper.Map<TurmasDto>(entity);
        }
    }
}
