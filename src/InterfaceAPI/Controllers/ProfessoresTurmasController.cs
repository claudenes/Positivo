
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
    [Route("api/professores-turmas")]
    [ApiController]
    public class ProfessoresTurmasController : ControllerBase
    {
        private const string EntityName = "professoresTurma";
        private readonly ILogger<ProfessoresTurmasController> _log;
        private readonly IMediator _mediator;

        public ProfessoresTurmasController(ILogger<ProfessoresTurmasController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PROFESSORESTURMA_ALTERACAO)]
        public async Task<ActionResult<ProfessoresTurmaDto>> CreateProfessoresTurma([FromBody] ProfessoresTurmaDto professoresTurmaDto)
        {
            _log.LogDebug($"REST request to save ProfessoresTurma : {professoresTurmaDto}");
            if (professoresTurmaDto.Id != 0)
                throw new BadRequestAlertException("A new professoresTurma cannot already have an ID", EntityName, "idexists");
            var professoresTurma = await _mediator.Send(new ProfessoresTurmaCreateCommand { ProfessoresTurmaDto = professoresTurmaDto });
            return CreatedAtAction(nameof(GetProfessoresTurma), new { id = professoresTurma.Id }, professoresTurma)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, professoresTurma.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PROFESSORESTURMA_ALTERACAO)]
        public async Task<IActionResult> UpdateProfessoresTurma(long id, [FromBody] ProfessoresTurmaDto professoresTurmaDto)
        {
            _log.LogDebug($"REST request to update ProfessoresTurma : {professoresTurmaDto}");
            if (professoresTurmaDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != professoresTurmaDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var professoresTurma = await _mediator.Send(new ProfessoresTurmaUpdateCommand { ProfessoresTurmaDto = professoresTurmaDto });
            return Ok(professoresTurma)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, professoresTurma.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.PROFESSORESTURMA_CONSULTA)]
        public async Task<ActionResult<IEnumerable<ProfessoresTurmaDto>>> GetAllProfessoresTurmas(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of ProfessoresTurmas");
            var result = await _mediator.Send(new ProfessoresTurmaGetAllQuery { Page = pageable });
            return Ok(((IPage<ProfessoresTurmaDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.PROFESSORESTURMA_CONSULTA)]
        public async Task<IActionResult> GetProfessoresTurma([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get ProfessoresTurma : {id}");
            var result = await _mediator.Send(new ProfessoresTurmaGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.PROFESSORESTURMA_ALTERACAO)]
        public async Task<IActionResult> DeleteProfessoresTurma([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete ProfessoresTurma : {id}");
            await _mediator.Send(new ProfessoresTurmaDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
