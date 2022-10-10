
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
    [Route("api/niveis-ensinos")]
    [ApiController]
    public class NiveisEnsinosController : ControllerBase
    {
        private const string EntityName = "niveisEnsino";
        private readonly ILogger<NiveisEnsinosController> _log;
        private readonly IMediator _mediator;

        public NiveisEnsinosController(ILogger<NiveisEnsinosController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.NIVEISENSINO_ALTERACAO)]
        public async Task<ActionResult<NiveisEnsinoDto>> CreateNiveisEnsino([FromBody] NiveisEnsinoDto niveisEnsinoDto)
        {
            _log.LogDebug($"REST request to save NiveisEnsino : {niveisEnsinoDto}");
            if (niveisEnsinoDto.Id != 0)
                throw new BadRequestAlertException("A new niveisEnsino cannot already have an ID", EntityName, "idexists");
            var niveisEnsino = await _mediator.Send(new NiveisEnsinoCreateCommand { NiveisEnsinoDto = niveisEnsinoDto });
            return CreatedAtAction(nameof(GetNiveisEnsino), new { id = niveisEnsino.Id }, niveisEnsino)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, niveisEnsino.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.NIVEISENSINO_ALTERACAO)]
        public async Task<IActionResult> UpdateNiveisEnsino(long id, [FromBody] NiveisEnsinoDto niveisEnsinoDto)
        {
            _log.LogDebug($"REST request to update NiveisEnsino : {niveisEnsinoDto}");
            if (niveisEnsinoDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != niveisEnsinoDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var niveisEnsino = await _mediator.Send(new NiveisEnsinoUpdateCommand { NiveisEnsinoDto = niveisEnsinoDto });
            return Ok(niveisEnsino)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, niveisEnsino.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.NIVEISENSINO_CONSULTA)]
        public async Task<ActionResult<IEnumerable<NiveisEnsinoDto>>> GetAllNiveisEnsinos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of NiveisEnsinos");
            var result = await _mediator.Send(new NiveisEnsinoGetAllQuery { Page = pageable });
            return Ok(((IPage<NiveisEnsinoDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.NIVEISENSINO_CONSULTA)]
        public async Task<IActionResult> GetNiveisEnsino([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get NiveisEnsino : {id}");
            var result = await _mediator.Send(new NiveisEnsinoGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.NIVEISENSINO_ALTERACAO)]
        public async Task<IActionResult> DeleteNiveisEnsino([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete NiveisEnsino : {id}");
            await _mediator.Send(new NiveisEnsinoDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
