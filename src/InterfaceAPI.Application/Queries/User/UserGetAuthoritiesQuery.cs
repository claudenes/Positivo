using MediatR;
using System.Collections.Generic;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class UserGetAuthoritiesQuery : IRequest<IEnumerable<string>>
    {
    }
}
