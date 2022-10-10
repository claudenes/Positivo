
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
    public class UnidadesFisicasGetQueryHandler : IRequestHandler<UnidadesFisicasGetQuery, UnidadesFisicasDto>
    {
        private IReadOnlyUnidadesFisicasRepository _unidadesFisicasRepository;
        private readonly IMapper _mapper;

        public UnidadesFisicasGetQueryHandler(
            IMapper mapper,
            IReadOnlyUnidadesFisicasRepository unidadesFisicasRepository)
        {
            _mapper = mapper;
            _unidadesFisicasRepository = unidadesFisicasRepository;
        }

        public async Task<UnidadesFisicasDto> Handle(UnidadesFisicasGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _unidadesFisicasRepository.QueryHelper()
                .GetOneAsync(unidadesFisicas => unidadesFisicas.Id == request.Id);
            return _mapper.Map<UnidadesFisicasDto>(entity);
        }
    }
}
