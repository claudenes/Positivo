using AutoMapper;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Domain.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Positivo.InterfaceAPI.Crosscutting.Exceptions;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountGetQueryHandler : IRequestHandler<AccountGetQuery, UserDto>
    {
        private readonly IUserService _userService;
        private readonly IMapper _userMapper;

        public AccountGetQueryHandler(IUserService userService, IMapper mapper)
        {
            _userMapper = mapper;
            _userService = userService;
        }

        public async Task<UserDto> Handle(AccountGetQuery command, CancellationToken cancellationToken)
        {
            var user = await _userService.GetUserWithUserRoles();
            if (user == null) throw new InternalServerErrorException("User could not be found");
            return _userMapper.Map<UserDto>(user);
        }
    }
}
