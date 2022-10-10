
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
    [Route("api/funcionarios")]
    [ApiController]
    public class FuncionariosController : ControllerBase
    {
        private const string EntityName = "funcionarios";
        private readonly ILogger<FuncionariosController> _log;
        private readonly IMediator _mediator;

        public FuncionariosController(ILogger<FuncionariosController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.FUNCIONARIOS_ALTERACAO)]
        public async Task<ActionResult<FuncionariosDto>> CreateFuncionarios([FromBody] FuncionariosDto funcionariosDto)
        {
            _log.LogDebug($"REST request to save Funcionarios : {funcionariosDto}");
            if (funcionariosDto.Id != 0)
                throw new BadRequestAlertException("A new funcionarios cannot already have an ID", EntityName, "idexists");
            var funcionarios = await _mediator.Send(new FuncionariosCreateCommand { FuncionariosDto = funcionariosDto });
            return CreatedAtAction(nameof(GetFuncionarios), new { id = funcionarios.Id }, funcionarios)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, funcionarios.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        [Authorize(Roles = RolesConstants.FUNCIONARIOS_ALTERACAO)]
        public async Task<IActionResult> UpdateFuncionarios(long id, [FromBody] FuncionariosDto funcionariosDto)
        {
            _log.LogDebug($"REST request to update Funcionarios : {funcionariosDto}");
            if (funcionariosDto.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != funcionariosDto.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            var funcionarios = await _mediator.Send(new FuncionariosUpdateCommand { FuncionariosDto = funcionariosDto });
            return Ok(funcionarios)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, funcionarios.Id.ToString()));
        }

        [HttpGet]
        [Authorize(Roles = RolesConstants.FUNCIONARIOS_CONSULTA)]
        public async Task<ActionResult<IEnumerable<FuncionariosDto>>> GetAllFuncionarios(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Funcionarios");
            var result = await _mediator.Send(new FuncionariosGetAllQuery { Page = pageable });
            return Ok(((IPage<FuncionariosDto>)result).Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RolesConstants.FUNCIONARIOS_CONSULTA)]
        public async Task<IActionResult> GetFuncionarios([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Funcionarios : {id}");
            var result = await _mediator.Send(new FuncionariosGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesConstants.FUNCIONARIOS_ALTERACAO)]
        public async Task<IActionResult> DeleteFuncionarios([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Funcionarios : {id}");
            await _mediator.Send(new FuncionariosDeleteCommand { Id = id });
            return Ok().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
