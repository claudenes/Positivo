
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
    [Route("api/turmas")]
    [ApiController]
    public class TurmasController : ControllerBase
    {
        private const string EntityName = "turmas";
        private readonly ILogger<TurmasController> _log;
        private readonly IMediator _mediator;

        public TurmasController(ILogger<TurmasController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.TURMAS_ALTERACAO)]
        public async Task<ActionResult<TurmasDto>> CreateTurmas([FromBody] TurmasDto turmasDto)
        {
            _log.LogDebug($"REST request to save Turmas : {turmasDto}");
            if (turmasDto.Id != 0)
                throw new BadRequestAlertException("A new turmas cannot already have an ID", EntityName, "idexists");
            var turmas = await _mediator.Send(new TurmasCreateCommand { TurmasDto = turmasDto });
            return CreatedAtAction(nameof(GetTurmas), new { id = turmas.Id }, turmas)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, turmas.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.TURMAS_ALTERACAO)]
        public async Task<IActionResult> UpdateTurmas(long id, [FromBody] TurmasDto turmasDto)
        {
            _log.LogDebug($"REST request to update Turmas : {turmasDto}");
            if (turmasDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != turmasDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var turmas = await _mediator.Send(new TurmasUpdateCommand { TurmasDto = turmasDto });
            return Ok(turmas)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, turmas.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.TURMAS_CONSULTA)]
        public async Task<ActionResult<IEnumerable<TurmasDto>>> GetAllTurmas(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Turmas");
            var result = await _mediator.Send(new TurmasGetAllQuery { Page = pageable });
            return Ok(((IPage<TurmasDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.TURMAS_CONSULTA)]
        public async Task<IActionResult> GetTurmas([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Turmas : {id}");
            var result = await _mediator.Send(new TurmasGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.TURMAS_ALTERACAO)]
        public async Task<IActionResult> DeleteTurmas([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Turmas : {id}");
            await _mediator.Send(new TurmasDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
