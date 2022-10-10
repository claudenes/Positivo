
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
    public class FuncionariosGetQueryHandler : IRequestHandler<FuncionariosGetQuery, FuncionariosDto>
    {
        private IReadOnlyFuncionariosRepository _funcionariosRepository;
        private readonly IMapper _mapper;

        public FuncionariosGetQueryHandler(
            IMapper mapper,
            IReadOnlyFuncionariosRepository funcionariosRepository)
        {
            _mapper = mapper;
            _funcionariosRepository = funcionariosRepository;
        }

        public async Task<FuncionariosDto> Handle(FuncionariosGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _funcionariosRepository.QueryHelper()
                .GetOneAsync(funcionarios => funcionarios.Id == request.Id);
            return _mapper.Map<FuncionariosDto>(entity);
        }
    }
}
