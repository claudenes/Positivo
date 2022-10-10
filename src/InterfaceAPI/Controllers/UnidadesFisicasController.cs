
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
    [Route("api/unidades-fisicas")]
    [ApiController]
    public class UnidadesFisicasController : ControllerBase
    {
        private const string EntityName = "unidadesFisicas";
        private readonly ILogger<UnidadesFisicasController> _log;
        private readonly IMediator _mediator;

        public UnidadesFisicasController(ILogger<UnidadesFisicasController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.UNIDADESFISICAS_ALTERACAO)]
        public async Task<ActionResult<UnidadesFisicasDto>> CreateUnidadesFisicas([FromBody] UnidadesFisicasDto unidadesFisicasDto)
        {
            _log.LogDebug($"REST request to save UnidadesFisicas : {unidadesFisicasDto}");
            if (unidadesFisicasDto.Id != 0)
                throw new BadRequestAlertException("A new unidadesFisicas cannot already have an ID", EntityName, "idexists");
            var unidadesFisicas = await _mediator.Send(new UnidadesFisicasCreateCommand { UnidadesFisicasDto = unidadesFisicasDto });
            return CreatedAtAction(nameof(GetUnidadesFisicas), new { id = unidadesFisicas.Id }, unidadesFisicas)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, unidadesFisicas.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.UNIDADESFISICAS_ALTERACAO)]
        public async Task<IActionResult> UpdateUnidadesFisicas(long id, [FromBody] UnidadesFisicasDto unidadesFisicasDto)
        {
            _log.LogDebug($"REST request to update UnidadesFisicas : {unidadesFisicasDto}");
            if (unidadesFisicasDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != unidadesFisicasDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var unidadesFisicas = await _mediator.Send(new UnidadesFisicasUpdateCommand { UnidadesFisicasDto = unidadesFisicasDto });
            return Ok(unidadesFisicas)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, unidadesFisicas.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.UNIDADESFISICAS_CONSULTA)]
        public async Task<ActionResult<IEnumerable<UnidadesFisicasDto>>> GetAllUnidadesFisicas(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of UnidadesFisicas");
            var result = await _mediator.Send(new UnidadesFisicasGetAllQuery { Page = pageable });
            return Ok(((IPage<UnidadesFisicasDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.UNIDADESFISICAS_CONSULTA)]
        public async Task<IActionResult> GetUnidadesFisicas([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get UnidadesFisicas : {id}");
            var result = await _mediator.Send(new UnidadesFisicasGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.UNIDADESFISICAS_ALTERACAO)]
        public async Task<IActionResult> DeleteUnidadesFisicas([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete UnidadesFisicas : {id}");
            await _mediator.Send(new UnidadesFisicasDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
