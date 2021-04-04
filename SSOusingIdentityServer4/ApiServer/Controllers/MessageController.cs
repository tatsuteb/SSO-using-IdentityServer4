using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [HttpGet("greetings")]
        public string GetMessage()
        {
            return "Hello World!";
        }

        [HttpGet("protected")]
        public string GetMessageFromProtectedApi()
        {
            return "Secret Message!";
        }
    }
}
