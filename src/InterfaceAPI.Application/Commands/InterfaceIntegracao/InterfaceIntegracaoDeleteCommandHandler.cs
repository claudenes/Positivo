
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class InterfaceIntegracaoDeleteCommandHandler : IRequestHandler<InterfaceIntegracaoDeleteCommand, Unit>
    {
        private IInterfaceIntegracaoRepository _interfaceIntegracaoRepository;

        public InterfaceIntegracaoDeleteCommandHandler(
            IInterfaceIntegracaoRepository interfaceIntegracaoRepository)
        {
            _interfaceIntegracaoRepository = interfaceIntegracaoRepository;
        }

        public async Task<Unit> Handle(InterfaceIntegracaoDeleteCommand command, CancellationToken cancellationToken)
        {
            await _interfaceIntegracaoRepository.DeleteByIdAsync(command.Id);
            await _interfaceIntegracaoRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
