using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Positivo.InterfaceAPI.Dto;

namespace Positivo.InterfaceAPI.Controllers
{
    [Route("")]
    [ApiController]
    public class SwaggerController : ControllerBase
    {
        private readonly ILogger<SwaggerController> _log;

        public SwaggerController(ILogger<SwaggerController> log)
        {
            _log = log;
        }

        [HttpGet("swagger-resources")]
        public ActionResult<IEnumerable<SwaggerResourceDto>> GetSwaggerResources()
        {
            _log.LogDebug("REST request to get Swagger Resources");
            SwaggerResourceDto sr1 = new SwaggerResourceDto() { Name = "InterfaceAPI", Location = "/v2/api-docs" };
            List<SwaggerResourceDto> swaggerResources = new List<SwaggerResourceDto>();
            swaggerResources.Add(sr1);
            return Ok(swaggerResources);
        }
    }
}
