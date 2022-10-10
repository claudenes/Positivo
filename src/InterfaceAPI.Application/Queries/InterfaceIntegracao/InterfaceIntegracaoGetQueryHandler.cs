
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
    public class InterfaceIntegracaoGetQueryHandler : IRequestHandler<InterfaceIntegracaoGetQuery, InterfaceIntegracaoDto>
    {
        private IReadOnlyInterfaceIntegracaoRepository _interfaceIntegracaoRepository;
        private readonly IMapper _mapper;

        public InterfaceIntegracaoGetQueryHandler(
            IMapper mapper,
            IReadOnlyInterfaceIntegracaoRepository interfaceIntegracaoRepository)
        {
            _mapper = mapper;
            _interfaceIntegracaoRepository = interfaceIntegracaoRepository;
        }

        public async Task<InterfaceIntegracaoDto> Handle(InterfaceIntegracaoGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _interfaceIntegracaoRepository.QueryHelper()
                .GetOneAsync(interfaceIntegracao => interfaceIntegracao.Id == request.Id);
            return _mapper.Map<InterfaceIntegracaoDto>(entity);
        }
    }
}
