
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosTurmaCreateCommandHandler : IRequestHandler<AlunosTurmaCreateCommand, AlunosTurma>
    {
        private IAlunosTurmaRepository _alunosTurmaRepository;
        private readonly IMapper _mapper;

        public AlunosTurmaCreateCommandHandler(
            IMapper mapper,
            IAlunosTurmaRepository alunosTurmaRepository)
        {
            _mapper = mapper;
            _alunosTurmaRepository = alunosTurmaRepository;
        }

        public async Task<AlunosTurma> Handle(AlunosTurmaCreateCommand command, CancellationToken cancellationToken)
        {
            AlunosTurma alunosTurma = _mapper.Map<AlunosTurma>(command.AlunosTurmaDto);
            var entity = await _alunosTurmaRepository.CreateOrUpdateAsync(alunosTurma);
            await _alunosTurmaRepository.SaveChangesAsync();
            return entity;
        }
    }
}
