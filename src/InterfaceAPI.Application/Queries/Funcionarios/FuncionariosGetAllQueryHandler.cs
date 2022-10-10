
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
    public class FuncionariosGetAllQueryHandler : IRequestHandler<FuncionariosGetAllQuery, Page<FuncionariosDto>>
    {
        private IReadOnlyFuncionariosRepository _funcionariosRepository;
        private readonly IMapper _mapper;

        public FuncionariosGetAllQueryHandler(
            IMapper mapper,
            IReadOnlyFuncionariosRepository funcionariosRepository)
        {
            _mapper = mapper;
            _funcionariosRepository = funcionariosRepository;
        }

        public async Task<Page<FuncionariosDto>> Handle(FuncionariosGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _funcionariosRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return new Page<FuncionariosDto>(page.Content.Select(entity => _mapper.Map<FuncionariosDto>(entity)).ToList(), request.Page, page.TotalElements);
        }
    }
}
