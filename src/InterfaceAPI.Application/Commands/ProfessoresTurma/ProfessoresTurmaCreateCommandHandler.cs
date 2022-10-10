
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresTurmaCreateCommandHandler : IRequestHandler<ProfessoresTurmaCreateCommand, ProfessoresTurma>
    {
        private IProfessoresTurmaRepository _professoresTurmaRepository;
        private readonly IMapper _mapper;

        public ProfessoresTurmaCreateCommandHandler(
            IMapper mapper,
            IProfessoresTurmaRepository professoresTurmaRepository)
        {
            _mapper = mapper;
            _professoresTurmaRepository = professoresTurmaRepository;
        }

        public async Task<ProfessoresTurma> Handle(ProfessoresTurmaCreateCommand command, CancellationToken cancellationToken)
        {
            ProfessoresTurma professoresTurma = _mapper.Map<ProfessoresTurma>(command.ProfessoresTurmaDto);
            var entity = await _professoresTurmaRepository.CreateOrUpdateAsync(professoresTurma);
            await _professoresTurmaRepository.SaveChangesAsync();
            return entity;
        }
    }
}
