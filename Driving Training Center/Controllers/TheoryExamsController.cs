using DataLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Driving_Training_Center.Controllers
{
    public class Correction
    {
        [Required]
        public int theory_exam_id { get; set; }

        [Required]
        public Dictionary<int, int> answers { get; set; }
    }


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
        public async Task<ActionResult<IEnumerable<TheoryExam>>> GetTheoryExams()
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;
            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if (staff == null)
            {
                return Unauthorized();
            }

            return await _context.theory_exams.ToListAsync();
        }

        // GET: api/theory-exams/user
        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<TheoryExam>>> GetUserTheoryExams()
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;
            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }

            var type = _context.payments.Include("License").Where(q => q.applicant_id == applicant.id).FirstOrDefault();

            if (type == null)
            {
                return Unauthorized();
            }

            return await _context.theory_exams.Where(q => q.license_type == type.License.name).ToListAsync();
        }

        // GET: api/theory-exams/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable>> GetTheoryExam(int id)
        {
            var theoryExam = _context.theory_exams
                .Join(_context.questions, q => q.id, p => p.theory_exam_id, (q, p) => new { exam = q, questions = p })
                .AsEnumerable()
                .GroupBy(q => q.exam.id)
                .Where(q => q.Key == id)
                .Select(q => new
                {
                    id = q.Key,
                    time = q.Select(q => q.exam.time).First(),
                    questions = q.Join(_context.images.Where(q => q.imageable_type == "Question"),
                                    q => q.questions.id,
                                    p => p.imageable_id,
                                    (q, p) => new
                                    {
                                        q.questions.id,
                                        q.questions.title,
                                        q.questions.options,
                                        image = System.IO.Path.Combine("/images/md/", p.name),
                                    }
                                )
                }).FirstOrDefault();

            if (theoryExam == null)
            {
                return NotFound();
            }

            return Ok(theoryExam);
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

        // POST: api/theory-exams/correction
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("correction")]
        [Authorize]
        public async Task<ActionResult<TheoryExam>> CorrectionTheoryExam([FromForm] Correction correction)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }


            var questions = _context.questions.Where(q => q.theory_exam_id == correction.theory_exam_id).Select(q => new Question
            {
                id = q.id,
                correct_answer = q.correct_answer
            });


            var wrong = 0;


            foreach (Question question in questions)
            {
                if (correction.answers[question.id] != question.correct_answer)
                    wrong++;
            };


            var status = "قبول";
            if (wrong != 0 && questions.Count() / wrong < 2)
                status = "رد";

            var applicantTheoryExam = new ApplicantTheoryExam
            {
                status = status,
                applicant_id = applicant.id,
                theory_exam_id = correction.theory_exam_id,
                point = questions.Count() - wrong
            };

            _context.applicant_theory_exams.Add(applicantTheoryExam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheoryExam", new { id = applicantTheoryExam.id }, applicantTheoryExam);
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
