
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
    public class ProfessoresGetQueryHandler : IRequestHandler<ProfessoresGetQuery, ProfessoresDto>
    {
        private IReadOnlyProfessoresRepository _professoresRepository;
        private readonly IMapper _mapper;

        public ProfessoresGetQueryHandler(
            IMapper mapper,
            IReadOnlyProfessoresRepository professoresRepository)
        {
            _mapper = mapper;
            _professoresRepository = professoresRepository;
        }

        public async Task<ProfessoresDto> Handle(ProfessoresGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _professoresRepository.QueryHelper()
                .GetOneAsync(professores => professores.Id == request.Id);
            return _mapper.Map<ProfessoresDto>(entity);
        }
    }
}
