using IdentityServer4;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [Authorize(IdentityServerConstants.LocalApi.PolicyName)]
        [HttpGet("protected")]
        public string GetMessageFromProtectedApi()
        {
            return "Secret from IdentityServer.";
        }
    }
}
