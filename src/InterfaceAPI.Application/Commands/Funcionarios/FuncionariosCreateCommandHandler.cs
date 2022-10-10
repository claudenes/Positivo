
using AutoMapper;
using System.Linq;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class FuncionariosCreateCommandHandler : IRequestHandler<FuncionariosCreateCommand, Funcionarios>
    {
        private IFuncionariosRepository _funcionariosRepository;
        private readonly IMapper _mapper;

        public FuncionariosCreateCommandHandler(
            IMapper mapper,
            IFuncionariosRepository funcionariosRepository)
        {
            _mapper = mapper;
            _funcionariosRepository = funcionariosRepository;
        }

        public async Task<Funcionarios> Handle(FuncionariosCreateCommand command, CancellationToken cancellationToken)
        {
            Funcionarios funcionarios = _mapper.Map<Funcionarios>(command.FuncionariosDto);
            var entity = await _funcionariosRepository.CreateOrUpdateAsync(funcionarios);
            await _funcionariosRepository.SaveChangesAsync();
            return entity;
        }
    }
}
