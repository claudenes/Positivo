
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
    [Route("api/alunos")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private const string EntityName = "alunos";
        private readonly ILogger<AlunosController> _log;
        private readonly IMediator _mediator;

        public AlunosController(ILogger<AlunosController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.ALUNOS_ALTERACAO)]
        public async Task<ActionResult<AlunosDto>> CreateAlunos([FromBody] AlunosDto alunosDto)
        {
            _log.LogDebug($"REST request to save Alunos : {alunosDto}");
            if (alunosDto.Id != 0)
                throw new BadRequestAlertException("A new alunos cannot already have an ID", EntityName, "idexists");
            var alunos = await _mediator.Send(new AlunosCreateCommand { AlunosDto = alunosDto });
            return CreatedAtAction(nameof(GetAlunos), new { id = alunos.Id }, alunos)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, alunos.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.ALUNOS_ALTERACAO)]
        public async Task<IActionResult> UpdateAlunos(long id, [FromBody] AlunosDto alunosDto)
        {
            _log.LogDebug($"REST request to update Alunos : {alunosDto}");
            if (alunosDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != alunosDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var alunos = await _mediator.Send(new AlunosUpdateCommand { AlunosDto = alunosDto });
            return Ok(alunos)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, alunos.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.ALUNOS_CONSULTA)]
        public async Task<ActionResult<IEnumerable<AlunosDto>>> GetAllAlunos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Alunos");
            var result = await _mediator.Send(new AlunosGetAllQuery { Page = pageable });
            return Ok(((IPage<AlunosDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.ALUNOS_CONSULTA)]
        public async Task<IActionResult> GetAlunos([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Alunos : {id}");
            var result = await _mediator.Send(new AlunosGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.ALUNOS_ALTERACAO)]
        public async Task<IActionResult> DeleteAlunos([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Alunos : {id}");
            await _mediator.Send(new AlunosDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
