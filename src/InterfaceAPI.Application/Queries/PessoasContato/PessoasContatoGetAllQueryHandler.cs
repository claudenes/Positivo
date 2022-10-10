
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class PessoasContatoGetAllQueryHandler : IRequestHandler<PessoasContatoGetAllQuery, Page<PessoasContatoDto>>
    {
        private IReadOnlyPessoasContatoRepository _pessoasContatoRepository;
        private readonly IMapper _mapper;

        public PessoasContatoGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyPessoasContatoRepository pessoasContatoRepository)
        {
            _mapper = mapper;
            _pessoasContatoRepository = pessoasContatoRepository;
        }

        public async Task<Page<PessoasContatoDto>> Handle(PessoasContatoGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _pessoasContatoRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<PessoasContatoDto>(page.Content.Select(entity => _mapper.Map<PessoasContatoDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
