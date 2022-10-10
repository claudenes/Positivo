
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class PessoasContatoGetQueryHandler : IRequestHandler<PessoasContatoGetQuery, PessoasContatoDto>
    {
        private IReadOnlyPessoasContatoRepository _pessoasContatoRepository;
        private readonly IMapper _mapper;

        public PessoasContatoGetQueryHandler(
            IMapper mapper,
            IReadOnlyPessoasContatoRepository pessoasContatoRepository)
        {
            _mapper = mapper;
            _pessoasContatoRepository = pessoasContatoRepository;
        }

        public async Task<PessoasContatoDto> Handle(PessoasContatoGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _pessoasContatoRepository.QueryHelper()
                .GetOneAsync(pessoasContato => pessoasContato.Id == request.Id);
            return _mapper.Map<PessoasContatoDto>(entity);
        }
    }
}
