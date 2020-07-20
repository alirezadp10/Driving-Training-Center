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
    [Route("api/applicant-theory-exams")]
    [ApiController]
    public class ApplicantTheoryExamsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public ApplicantTheoryExamsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/applicant-theory-exams
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ApplicantTheoryExam>>> Getapplicant_theory_exams()
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }


            return await _context.applicant_theory_exams.Include("Applicant").Include("TheoryExam").Where(q=>q.applicant_id == applicant.id).ToListAsync();
        }

        // GET: api/applicant-theory-exams/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ApplicantTheoryExam>> GetApplicantTheoryExam(int id)
        {
            var applicantTheoryExam = await _context.applicant_theory_exams.FindAsync(id);

            if (applicantTheoryExam == null)
            {
                return NotFound();
            }

            return applicantTheoryExam;
        }

        // PUT: api/applicant-theory-exams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutApplicantTheoryExam(int id, [FromForm] ApplicantTheoryExam applicantTheoryExam)
        {
            if (id != applicantTheoryExam.applicant_id)
            {
                return BadRequest();
            }

            applicantTheoryExam.updated_at = DateTime.Now;
            _context.Entry(applicantTheoryExam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicantTheoryExamExists(id))
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

        // POST: api/applicant-theory-exams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApplicantTheoryExam>> PostApplicantTheoryExam([FromForm] int exam_id)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }

            var applicantTheoryExam = new ApplicantTheoryExam
            {
                applicant_id = applicant.id,
                theory_exam_id = exam_id
            };

            _context.applicant_theory_exams.Add(applicantTheoryExam);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApplicantTheoryExamExists(applicantTheoryExam.applicant_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetApplicantTheoryExam", new { id = applicantTheoryExam.applicant_id }, applicantTheoryExam);
        }

        // DELETE: api/applicant-theory-exams/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ApplicantTheoryExam>> DeleteApplicantTheoryExam(int id)
        {
            var applicantTheoryExam = await _context.applicant_theory_exams.FindAsync(id);
            if (applicantTheoryExam == null)
            {
                return NotFound();
            }

            _context.applicant_theory_exams.Remove(applicantTheoryExam);
            await _context.SaveChangesAsync();

            return applicantTheoryExam;
        }

        private bool ApplicantTheoryExamExists(int id)
        {
            return _context.applicant_theory_exams.Any(e => e.applicant_id == id);
        }
    }
}
