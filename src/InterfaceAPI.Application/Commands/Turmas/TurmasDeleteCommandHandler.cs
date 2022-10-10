
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class TurmasDeleteCommandHandler : IRequestHandler<TurmasDeleteCommand, Unit>
    {
        private ITurmasRepository _turmasRepository;

        public TurmasDeleteCommandHandler(
            ITurmasRepository turmasRepository)
        {
            _turmasRepository = turmasRepository;
        }

        public async Task<Unit> Handle(TurmasDeleteCommand command, CancellationToken cancellationToken)
        {
            await _turmasRepository.DeleteByIdAsync(command.Id);
            await _turmasRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
