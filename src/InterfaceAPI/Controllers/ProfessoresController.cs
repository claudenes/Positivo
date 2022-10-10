
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
    [Route("api/professores")]
    [ApiController]
    public class ProfessoresController : ControllerBase
    {
        private const string EntityName = "professores";
        private readonly ILogger<ProfessoresController> _log;
        private readonly IMediator _mediator;

        public ProfessoresController(ILogger<ProfessoresController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PROFESSORES_ALTERACAO)]
        public async Task<ActionResult<ProfessoresDto>> CreateProfessores([FromBody] ProfessoresDto professoresDto)
        {
            _log.LogDebug($"REST request to save Professores : {professoresDto}");
            if (professoresDto.Id != 0)
                throw new BadRequestAlertException("A new professores cannot already have an ID", EntityName, "idexists");
            var professores = await _mediator.Send(new ProfessoresCreateCommand { ProfessoresDto = professoresDto });
            return CreatedAtAction(nameof(GetProfessores), new { id = professores.Id }, professores)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, professores.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PROFESSORES_ALTERACAO)]
        public async Task<IActionResult> UpdateProfessores(long id, [FromBody] ProfessoresDto professoresDto)
        {
            _log.LogDebug($"REST request to update Professores : {professoresDto}");
            if (professoresDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != professoresDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var professores = await _mediator.Send(new ProfessoresUpdateCommand { ProfessoresDto = professoresDto });
            return Ok(professores)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, professores.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.PROFESSORES_CONSULTA)]
        public async Task<ActionResult<IEnumerable<ProfessoresDto>>> GetAllProfessores(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Professores");
            var result = await _mediator.Send(new ProfessoresGetAllQuery { Page = pageable });
            return Ok(((IPage<ProfessoresDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.PROFESSORES_CONSULTA)]
        public async Task<IActionResult> GetProfessores([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Professores : {id}");
            var result = await _mediator.Send(new ProfessoresGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.PROFESSORES_ALTERACAO)]
        public async Task<IActionResult> DeleteProfessores([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Professores : {id}");
            await _mediator.Send(new ProfessoresDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
