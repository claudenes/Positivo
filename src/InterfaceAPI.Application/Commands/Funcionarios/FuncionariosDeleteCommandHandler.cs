
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class FuncionariosDeleteCommandHandler : IRequestHandler<FuncionariosDeleteCommand, Unit>
    {
        private IFuncionariosRepository _funcionariosRepository;

        public FuncionariosDeleteCommandHandler(
            IFuncionariosRepository funcionariosRepository)
        {
            _funcionariosRepository = funcionariosRepository;
        }

        public async Task<Unit> Handle(FuncionariosDeleteCommand command, CancellationToken cancellationToken)
        {
            await _funcionariosRepository.DeleteByIdAsync(command.Id);
            await _funcionariosRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
