
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresTurmaDeleteCommandHandler : IRequestHandler<ProfessoresTurmaDeleteCommand, Unit>
    {
        private IProfessoresTurmaRepository _professoresTurmaRepository;

        public ProfessoresTurmaDeleteCommandHandler(
            IProfessoresTurmaRepository professoresTurmaRepository)
        {
            _professoresTurmaRepository = professoresTurmaRepository;
        }

        public async Task<Unit> Handle(ProfessoresTurmaDeleteCommand command, CancellationToken cancellationToken)
        {
            await _professoresTurmaRepository.DeleteByIdAsync(command.Id);
            await _professoresTurmaRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
