
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class NiveisEnsinoDeleteCommandHandler : IRequestHandler<NiveisEnsinoDeleteCommand, Unit>
    {
        private INiveisEnsinoRepository _niveisEnsinoRepository;

        public NiveisEnsinoDeleteCommandHandler(
            INiveisEnsinoRepository niveisEnsinoRepository)
        {
            _niveisEnsinoRepository = niveisEnsinoRepository;
        }

        public async Task<Unit> Handle(NiveisEnsinoDeleteCommand command, CancellationToken cancellationToken)
        {
            await _niveisEnsinoRepository.DeleteByIdAsync(command.Id);
            await _niveisEnsinoRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
