using Positivo.InterfaceAPI.Domain;
using MediatR;
using Positivo.InterfaceAPI.Dto;
using System.Security.Claims;

namespace Positivo.InterfaceAPI.Application.Commands
{
    public class AccountGetAuthenticatedQuery : IRequest<string>
    {
        public ClaimsPrincipal User { get; set; }
    }
}
