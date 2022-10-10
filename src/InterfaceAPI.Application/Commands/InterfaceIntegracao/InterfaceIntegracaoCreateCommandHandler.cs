
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class InterfaceIntegracaoCreateCommandHandler : IRequestHandler<InterfaceIntegracaoCreateCommand, InterfaceIntegracao>
    {
        private IInterfaceIntegracaoRepository _interfaceIntegracaoRepository;
        private readonly IMapper _mapper;

        public InterfaceIntegracaoCreateCommandHandler(
            IMapper mapper,
            IInterfaceIntegracaoRepository interfaceIntegracaoRepository)
        {
            _mapper = mapper;
            _interfaceIntegracaoRepository = interfaceIntegracaoRepository;
        }

        public async Task<InterfaceIntegracao> Handle(InterfaceIntegracaoCreateCommand command, CancellationToken cancellationToken)
        {
            InterfaceIntegracao interfaceIntegracao = _mapper.Map<InterfaceIntegracao>(command.InterfaceIntegracaoDto);
            var entity = await _interfaceIntegracaoRepository.CreateOrUpdateAsync(interfaceIntegracao);
            await _interfaceIntegracaoRepository.SaveChangesAsync();
            return entity;
        }
    }
}
