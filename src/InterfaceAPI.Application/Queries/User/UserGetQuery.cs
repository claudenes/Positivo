using Positivo.InterfaceAPI.Dto;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class UserGetQuery : IRequest<UserDto>
    {
        public string Login { get; set; }
    }
}
