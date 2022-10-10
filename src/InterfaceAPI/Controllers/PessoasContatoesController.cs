
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
    [Route("api/pessoas-contatoes")]
    [ApiController]
    public class PessoasContatoesController : ControllerBase
    {
        private const string EntityName = "pessoasContato";
        private readonly ILogger<PessoasContatoesController> _log;
        private readonly IMediator _mediator;

        public PessoasContatoesController(ILogger<PessoasContatoesController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PESSOASCONTATO_ALTERACAO)]
        public async Task<ActionResult<PessoasContatoDto>> CreatePessoasContato([FromBody] PessoasContatoDto pessoasContatoDto)
        {
            _log.LogDebug($"REST request to save PessoasContato : {pessoasContatoDto}");
            if (pessoasContatoDto.Id != 0)
                throw new BadRequestAlertException("A new pessoasContato cannot already have an ID", EntityName, "idexists");
            var pessoasContato = await _mediator.Send(new PessoasContatoCreateCommand { PessoasContatoDto = pessoasContatoDto });
            return CreatedAtAction(nameof(GetPessoasContato), new { id = pessoasContato.Id }, pessoasContato)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, pessoasContato.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.PESSOASCONTATO_ALTERACAO)]
        public async Task<IActionResult> UpdatePessoasContato(long id, [FromBody] PessoasContatoDto pessoasContatoDto)
        {
            _log.LogDebug($"REST request to update PessoasContato : {pessoasContatoDto}");
            if (pessoasContatoDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != pessoasContatoDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var pessoasContato = await _mediator.Send(new PessoasContatoUpdateCommand { PessoasContatoDto = pessoasContatoDto });
            return Ok(pessoasContato)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, pessoasContato.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.PESSOASCONTATO_CONSULTA)]
        public async Task<ActionResult<IEnumerable<PessoasContatoDto>>> GetAllPessoasContatoes(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of PessoasContatoes");
            var result = await _mediator.Send(new PessoasContatoGetAllQuery { Page = pageable });
            return Ok(((IPage<PessoasContatoDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.PESSOASCONTATO_CONSULTA)]
        public async Task<IActionResult> GetPessoasContato([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get PessoasContato : {id}");
            var result = await _mediator.Send(new PessoasContatoGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.PESSOASCONTATO_ALTERACAO)]
        public async Task<IActionResult> DeletePessoasContato([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete PessoasContato : {id}");
            await _mediator.Send(new PessoasContatoDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
