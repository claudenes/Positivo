
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class UnidadesFisicasUpdateCommandHandler : IRequestHandler<UnidadesFisicasUpdateCommand, UnidadesFisicas>
    {
        private IUnidadesFisicasRepository _unidadesFisicasRepository;
        private readonly IMapper _mapper;

        public UnidadesFisicasUpdateCommandHandler(
            IMapper mapper,
            IUnidadesFisicasRepository unidadesFisicasRepository)
        {
            _mapper = mapper;
            _unidadesFisicasRepository = unidadesFisicasRepository;
        }

        public async Task<UnidadesFisicas> Handle(UnidadesFisicasUpdateCommand command, CancellationToken cancellationToken)
        {
            UnidadesFisicas unidadesFisicas = _mapper.Map<UnidadesFisicas>(command.UnidadesFisicasDto);
            var entity = await _unidadesFisicasRepository.CreateOrUpdateAsync(unidadesFisicas);
            await _unidadesFisicasRepository.SaveChangesAsync();
            return entity;
        }
    }
}
