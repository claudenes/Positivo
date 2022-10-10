
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
    public class NiveisEnsinoGetQueryHandler : IRequestHandler<NiveisEnsinoGetQuery, NiveisEnsinoDto>
    {
        private IReadOnlyNiveisEnsinoRepository _niveisEnsinoRepository;
        private readonly IMapper _mapper;

        public NiveisEnsinoGetQueryHandler(
            IMapper mapper,
            IReadOnlyNiveisEnsinoRepository niveisEnsinoRepository)
        {
            _mapper = mapper;
            _niveisEnsinoRepository = niveisEnsinoRepository;
        }

        public async Task<NiveisEnsinoDto> Handle(NiveisEnsinoGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _niveisEnsinoRepository.QueryHelper()
                .GetOneAsync(niveisEnsino => niveisEnsino.Id == request.Id);
            return _mapper.Map<NiveisEnsinoDto>(entity);
        }
    }
}
