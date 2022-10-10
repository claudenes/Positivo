
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
    [Route("api/alunos-turmas")]
    [ApiController]
    public class AlunosTurmasController : ControllerBase
    {
        private const string EntityName = "alunosTurma";
        private readonly ILogger<AlunosTurmasController> _log;
        private readonly IMediator _mediator;

        public AlunosTurmasController(ILogger<AlunosTurmasController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.ALUNOSTURMA_ALTERACAO)]
        public async Task<ActionResult<AlunosTurmaDto>> CreateAlunosTurma([FromBody] AlunosTurmaDto alunosTurmaDto)
        {
            _log.LogDebug($"REST request to save AlunosTurma : {alunosTurmaDto}");
            if (alunosTurmaDto.Id != 0)
                throw new BadRequestAlertException("A new alunosTurma cannot already have an ID", EntityName, "idexists");
            var alunosTurma = await _mediator.Send(new AlunosTurmaCreateCommand { AlunosTurmaDto = alunosTurmaDto });
            return CreatedAtAction(nameof(GetAlunosTurma), new { id = alunosTurma.Id }, alunosTurma)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, alunosTurma.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.ALUNOSTURMA_ALTERACAO)]
        public async Task<IActionResult> UpdateAlunosTurma(long id, [FromBody] AlunosTurmaDto alunosTurmaDto)
        {
            _log.LogDebug($"REST request to update AlunosTurma : {alunosTurmaDto}");
            if (alunosTurmaDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != alunosTurmaDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var alunosTurma = await _mediator.Send(new AlunosTurmaUpdateCommand { AlunosTurmaDto = alunosTurmaDto });
            return Ok(alunosTurma)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, alunosTurma.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.ALUNOSTURMA_CONSULTA)]
        public async Task<ActionResult<IEnumerable<AlunosTurmaDto>>> GetAllAlunosTurmas(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of AlunosTurmas");
            var result = await _mediator.Send(new AlunosTurmaGetAllQuery { Page = pageable });
            return Ok(((IPage<AlunosTurmaDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.ALUNOSTURMA_CONSULTA)]
        public async Task<IActionResult> GetAlunosTurma([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get AlunosTurma : {id}");
            var result = await _mediator.Send(new AlunosTurmaGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.ALUNOSTURMA_ALTERACAO)]
        public async Task<IActionResult> DeleteAlunosTurma([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete AlunosTurma : {id}");
            await _mediator.Send(new AlunosTurmaDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
