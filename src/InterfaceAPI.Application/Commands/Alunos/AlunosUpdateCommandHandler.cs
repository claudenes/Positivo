
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AlunosUpdateCommandHandler : IRequestHandler<AlunosUpdateCommand, Alunos>
    {
        private IAlunosRepository _alunosRepository;
        private readonly IMapper _mapper;

        public AlunosUpdateCommandHandler(
            IMapper mapper,
            IAlunosRepository alunosRepository)
        {
            _mapper = mapper;
            _alunosRepository = alunosRepository;
        }

        public async Task<Alunos> Handle(AlunosUpdateCommand command, CancellationToken cancellationToken)
        {
            Alunos alunos = _mapper.Map<Alunos>(command.AlunosDto);
            var entity = await _alunosRepository.CreateOrUpdateAsync(alunos);
            await _alunosRepository.SaveChangesAsync();
            return entity;
        }
    }
}
