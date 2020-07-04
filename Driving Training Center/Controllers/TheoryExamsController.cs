using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using Microsoft.AspNetCore.Authorization;

namespace Driving_Training_Center.Controllers
{
    [Route("api/theory-exams")]
    [ApiController]
    public class TheoryExamsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public TheoryExamsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/theory-exams
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TheoryExam>>> Gettheorxams()
        {
            return await _context.theory_exams.ToListAsync();
        }

        // GET: api/theory-exams/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<TheoryExam>> GetTheoryExam(int id)
        {
            var theoryExam = await _context.theory_exams.FindAsync(id);

            if (theoryExam == null)
            {
                return NotFound();
            }

            return theoryExam;
        }

        // PUT: api/theory-exams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTheoryExam(int id, [FromForm] TheoryExam theoryExam)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if (staff == null)
            {
                return Unauthorized();
            }

            theoryExam.staff_id = staff.id;

            if (id != theoryExam.id)
            {
                return BadRequest();
            }

            theoryExam.updated_at = DateTime.Now;
            _context.Entry(theoryExam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheoryExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/theory-exams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TheoryExam>> PostTheoryExam([FromForm] TheoryExam theoryExam)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if (staff == null)
            {
                return Unauthorized();
            }

            theoryExam.staff_id = staff.id;

            _context.theory_exams.Add(theoryExam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheoryExam", new { id = theoryExam.id }, theoryExam);
        }

        // DELETE: api/theory-exams/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<TheoryExam>> DeleteTheoryExam(int id)
        {
            var theoryExam = await _context.theory_exams.FindAsync(id);
            if (theoryExam == null)
            {
                return NotFound();
            }

            _context.theory_exams.Remove(theoryExam);
            await _context.SaveChangesAsync();

            return theoryExam;
        }

        private bool TheoryExamExists(int id)
        {
            return _context.theory_exams.Any(e => e.id == id);
        }
    }
}
