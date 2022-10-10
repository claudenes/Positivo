
using MediatR;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Crosscutting.Exceptions;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Web.Extensions;
using Positivo.InterfaceAPI.Web.Filters;
using Positivo.InterfaceAPI.Web.Rest.Utilities;
using Positivo.InterfaceAPI.Application.Queries;
using Positivo.InterfaceAPI.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Positivo.InterfaceAPI.Crosscutting.Constants;

namespace Positivo.InterfaceAPI.Controllers
{
    [Authorize]
    [Route("api/interface-integracaos")]
    [ApiController]
    public class InterfaceIntegracaosController : ControllerBase
    {
        private const string EntityName = "interfaceIntegracao";
        private readonly ILogger<InterfaceIntegracaosController> _log;
        private readonly IMediator _mediator;

        public InterfaceIntegracaosController(ILogger<InterfaceIntegracaosController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.INTERFACEINTEGRACAO_ALTERACAO)]
        public async Task<ActionResult<InterfaceIntegracaoDto>> CreateInterfaceIntegracao([FromBody] InterfaceIntegracaoDto interfaceIntegracaoDto)
        {
            _log.LogDebug($"REST request to save InterfaceIntegracao : {interfaceIntegracaoDto}");
            if (interfaceIntegracaoDto.Id != 0)
                throw new BadRequestAlertException("A new interfaceIntegracao cannot already have an ID", EntityName, "idexists");
            var interfaceIntegracao = await _mediator.Send(new InterfaceIntegracaoCreateCommand { InterfaceIntegracaoDto = interfaceIntegracaoDto });
            return CreatedAtAction(nameof(GetInterfaceIntegracao), new { id = interfaceIntegracao.Id }, interfaceIntegracao)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, interfaceIntegracao.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.INTERFACEINTEGRACAO_ALTERACAO)]
        public async Task<IActionResult> UpdateInterfaceIntegracao(long id, [FromBody] InterfaceIntegracaoDto interfaceIntegracaoDto)
        {
            _log.LogDebug($"REST request to update InterfaceIntegracao : {interfaceIntegracaoDto}");
            if (interfaceIntegracaoDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != interfaceIntegracaoDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var interfaceIntegracao = await _mediator.Send(new InterfaceIntegracaoUpdateCommand { InterfaceIntegracaoDto = interfaceIntegracaoDto });
            return Ok(interfaceIntegracao)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, interfaceIntegracao.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.INTERFACEINTEGRACAO_CONSULTA)]
        public async Task<ActionResult<IEnumerable<InterfaceIntegracaoDto>>> GetAllInterfaceIntegracaos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of InterfaceIntegracaos");
            var result = await _mediator.Send(new InterfaceIntegracaoGetAllQuery { Page = pageable });
            return Ok(((IPage<InterfaceIntegracaoDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.INTERFACEINTEGRACAO_CONSULTA)]
        public async Task<IActionResult> GetInterfaceIntegracao([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get InterfaceIntegracao : {id}");
            var result = await _mediator.Send(new InterfaceIntegracaoGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.INTERFACEINTEGRACAO_ALTERACAO)]
        public async Task<IActionResult> DeleteInterfaceIntegracao([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete InterfaceIntegracao : {id}");
            await _mediator.Send(new InterfaceIntegracaoDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
