using DataLayer;
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Driving_Training_Center.Controllers
{
    public class AuthenticateRequest
    {
        [Required]
        public string national_code { get; set; }

        [Required]
        public string password { get; set; }
    }

    [Route("api")]
    [Authorize]
    [ApiController] 
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        private DrivingTrainingCenterContext _context;

        public AuthController(IAuthService authService, DrivingTrainingCenterContext context)
        {
            _authService = authService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult ApplicantLogin([FromForm] AuthenticateRequest request)
        {
            var user = _context.applicants.SingleOrDefault(
                x => x.national_code == request.national_code
            );

            if (user == null || !SecurePasswordHasher.Verify(request.password, user.password))
                return BadRequest(new { message = "Username or password is incorrect" });

            // authentication successful so generate jwt token
            var response = _authService.generateJwtToken(request.national_code);

            response["user"] = _context.applicants.Where(q => q.national_code == request.national_code).FirstOrDefault();

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("admin/login")]
        public IActionResult StaffLogin([FromForm] AuthenticateRequest request)
        {
            var user = _context.staffs.SingleOrDefault(
                x => x.national_code == request.national_code
            );

            if (user == null || !SecurePasswordHasher.Verify(request.password, user.password))
                return BadRequest(new { message = "Username or password is incorrect" });

            // authentication successful so generate jwt token
            var response = _authService.generateJwtToken(request.national_code);

            response["user"] = _context.staffs.Where(q => q.national_code == request.national_code).FirstOrDefault();

            return Ok(response);
        }

    }
}
