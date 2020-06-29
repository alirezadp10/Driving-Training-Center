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
        public async Task<ActionResult<IEnumerable<TheoryExam>>> Gettheorxams()
        {
            return await _context.theory_exams.ToListAsync();
        }

        // GET: api/theory-exams/5
        [HttpGet("{id}")]
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
        public async Task<IActionResult> PutTheoryExam(int id, [FromForm] TheoryExam theoryExam)
        {
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
        public async Task<ActionResult<TheoryExam>> PostTheoryExam([FromForm] TheoryExam theoryExam)
        {
            _context.theory_exams.Add(theoryExam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheoryExam", new { id = theoryExam.id }, theoryExam);
        }

        // DELETE: api/theory-exams/5
        [HttpDelete("{id}")]
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
