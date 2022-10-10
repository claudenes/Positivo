
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class ProfessoresUpdateCommandHandler : IRequestHandler<ProfessoresUpdateCommand, Professores>
    {
        private IProfessoresRepository _professoresRepository;
        private readonly IMapper _mapper;

        public ProfessoresUpdateCommandHandler(
            IMapper mapper,
            IProfessoresRepository professoresRepository)
        {
            _mapper = mapper;
            _professoresRepository = professoresRepository;
        }

        public async Task<Professores> Handle(ProfessoresUpdateCommand command, CancellationToken cancellationToken)
        {
            Professores professores = _mapper.Map<Professores>(command.ProfessoresDto);
            var entity = await _professoresRepository.CreateOrUpdateAsync(professores);
            await _professoresRepository.SaveChangesAsync();
            return entity;
        }
    }
}
