
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class PessoasContatoDeleteCommandHandler : IRequestHandler<PessoasContatoDeleteCommand, Unit>
    {
        private IPessoasContatoRepository _pessoasContatoRepository;

        public PessoasContatoDeleteCommandHandler(
            IPessoasContatoRepository pessoasContatoRepository)
        {
            _pessoasContatoRepository = pessoasContatoRepository;
        }

        public async Task<Unit> Handle(PessoasContatoDeleteCommand command, CancellationToken cancellationToken)
        {
            await _pessoasContatoRepository.DeleteByIdAsync(command.Id);
            await _pessoasContatoRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
