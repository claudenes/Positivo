using Positivo.InterfaceAPI.Dto;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace Positivo.InterfaceAPI.Application.Queries
{
    public class UserGetAllQuery : IRequest<(IHeaderDictionary, IEnumerable<UserDto>)>
    {
        public IPageable Page { get; set; }
    }
}
