
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosTurmaDeleteCommandHandler : IRequestHandler<AlunosTurmaDeleteCommand, Unit>
    {
        private IAlunosTurmaRepository _alunosTurmaRepository;

        public AlunosTurmaDeleteCommandHandler(
            IAlunosTurmaRepository alunosTurmaRepository)
        {
            _alunosTurmaRepository = alunosTurmaRepository;
        }

        public async Task<Unit> Handle(AlunosTurmaDeleteCommand command, CancellationToken cancellationToken)
        {
            await _alunosTurmaRepository.DeleteByIdAsync(command.Id);
            await _alunosTurmaRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
