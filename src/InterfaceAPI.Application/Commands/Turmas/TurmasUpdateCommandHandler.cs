
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class TurmasUpdateCommandHandler : IRequestHandler<TurmasUpdateCommand, Turmas>
    {
        private ITurmasRepository _turmasRepository;
        private readonly IMapper _mapper;

        public TurmasUpdateCommandHandler(
            IMapper mapper,
            ITurmasRepository turmasRepository)
        {
            _mapper = mapper;
            _turmasRepository = turmasRepository;
        }

        public async Task<Turmas> Handle(TurmasUpdateCommand command, CancellationToken cancellationToken)
        {
            Turmas turmas = _mapper.Map<Turmas>(command.TurmasDto);
            var entity = await _turmasRepository.CreateOrUpdateAsync(turmas);
            await _turmasRepository.SaveChangesAsync();
            return entity;
        }
    }
}
