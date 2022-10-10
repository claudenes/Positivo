
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class NiveisEnsinoCreateCommandHandler : IRequestHandler<NiveisEnsinoCreateCommand, NiveisEnsino>
    {
        private INiveisEnsinoRepository _niveisEnsinoRepository;
        private readonly IMapper _mapper;

        public NiveisEnsinoCreateCommandHandler(
            IMapper mapper,
            INiveisEnsinoRepository niveisEnsinoRepository)
        {
            _mapper = mapper;
            _niveisEnsinoRepository = niveisEnsinoRepository;
        }

        public async Task<NiveisEnsino> Handle(NiveisEnsinoCreateCommand command, CancellationToken cancellationToken)
        {
            NiveisEnsino niveisEnsino = _mapper.Map<NiveisEnsino>(command.NiveisEnsinoDto);
            var entity = await _niveisEnsinoRepository.CreateOrUpdateAsync(niveisEnsino);
            await _niveisEnsinoRepository.SaveChangesAsync();
            return entity;
        }
    }
}
