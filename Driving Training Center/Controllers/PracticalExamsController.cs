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
    [Route("api/Practical-Exams")]
    [ApiController]
    public class PracticalExamsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public PracticalExamsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/PracticalExams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PracticalExam>>> GetpracticalExams()
        {
            return await _context.practicalExams.Include("Applicant").Include("Officer").Include("Vehicle").ToListAsync();
        }

        // GET: api/PracticalExams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PracticalExam>> GetPracticalExam(int id)
        {
            var practicalExam = _context.practicalExams.Include("Applicant").Include("Officer").Include("Vehicle").Where(p => p.id == id);

            if (practicalExam == null)
            {
                return NotFound();
            }

            return Ok(practicalExam);
        }

        // PUT: api/PracticalExams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPracticalExam(int id, [FromForm] PracticalExam practicalExam)
        {
            if (id != practicalExam.id)
            {
                return BadRequest();
            }

            practicalExam.updated_at = DateTime.Now;
            _context.Entry(practicalExam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PracticalExamExists(id))
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

        // POST: api/PracticalExams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PracticalExam>> PostPracticalExam([FromForm] PracticalExam practicalExam)
        {
            practicalExam.status = "PENDING";
            _context.practicalExams.Add(practicalExam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPracticalExam", new { id = practicalExam.id }, practicalExam);
        }

        // DELETE: api/PracticalExams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PracticalExam>> DeletePracticalExam(int id)
        {
            var practicalExam = await _context.practicalExams.FindAsync(id);
            if (practicalExam == null)
            {
                return NotFound();
            }

            _context.practicalExams.Remove(practicalExam);
            await _context.SaveChangesAsync();

            return practicalExam;
        }

        private bool PracticalExamExists(int id)
        {
            return _context.practicalExams.Any(e => e.id == id);
        }
    }
}
