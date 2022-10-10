
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UnidadesFisicasDeleteCommandHandler : IRequestHandler<UnidadesFisicasDeleteCommand, Unit>
    {
        private IUnidadesFisicasRepository _unidadesFisicasRepository;

        public UnidadesFisicasDeleteCommandHandler(
            IUnidadesFisicasRepository unidadesFisicasRepository)
        {
            _unidadesFisicasRepository = unidadesFisicasRepository;
        }

        public async Task<Unit> Handle(UnidadesFisicasDeleteCommand command, CancellationToken cancellationToken)
        {
            await _unidadesFisicasRepository.DeleteByIdAsync(command.Id);
            await _unidadesFisicasRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
