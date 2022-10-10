
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class PessoasContatoUpdateCommandHandler : IRequestHandler<PessoasContatoUpdateCommand, PessoasContato>
    {
        private IPessoasContatoRepository _pessoasContatoRepository;
        private readonly IMapper _mapper;

        public PessoasContatoUpdateCommandHandler(
            IMapper mapper,
            IPessoasContatoRepository pessoasContatoRepository)
        {
            _mapper = mapper;
            _pessoasContatoRepository = pessoasContatoRepository;
        }

        public async Task<PessoasContato> Handle(PessoasContatoUpdateCommand command, CancellationToken cancellationToken)
        {
            PessoasContato pessoasContato = _mapper.Map<PessoasContato>(command.PessoasContatoDto);
            var entity = await _pessoasContatoRepository.CreateOrUpdateAsync(pessoasContato);
            await _pessoasContatoRepository.SaveChangesAsync();
            return entity;
        }
    }
}
