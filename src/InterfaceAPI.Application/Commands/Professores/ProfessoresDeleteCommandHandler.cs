
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresDeleteCommandHandler : IRequestHandler<ProfessoresDeleteCommand, Unit>
    {
        private IProfessoresRepository _professoresRepository;

        public ProfessoresDeleteCommandHandler(
            IProfessoresRepository professoresRepository)
        {
            _professoresRepository = professoresRepository;
        }

        public async Task<Unit> Handle(ProfessoresDeleteCommand command, CancellationToken cancellationToken)
        {
            await _professoresRepository.DeleteByIdAsync(command.Id);
            await _professoresRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
