using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;

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
        public async Task<ActionResult<IEnumerable<ApplicantTheoryExam>>> Getapplicant_theory_exams()
        {
            return await _context.applicant_theory_exams.Include("Applicant").Include("TheoryExam").ToListAsync();
        }

        // GET: api/applicant-theory-exams/5
        [HttpGet("{id}")]
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
        public async Task<ActionResult<ApplicantTheoryExam>> PostApplicantTheoryExam([FromForm] ApplicantTheoryExam applicantTheoryExam)
        {
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
