
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosDeleteCommandHandler : IRequestHandler<AlunosDeleteCommand, Unit>
    {
        private IAlunosRepository _alunosRepository;

        public AlunosDeleteCommandHandler(
            IAlunosRepository alunosRepository)
        {
            _alunosRepository = alunosRepository;
        }

        public async Task<Unit> Handle(AlunosDeleteCommand command, CancellationToken cancellationToken)
        {
            await _alunosRepository.DeleteByIdAsync(command.Id);
            await _alunosRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
