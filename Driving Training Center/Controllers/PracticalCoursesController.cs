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
    [Route("api/Practical-Courses")]
    [ApiController]
    public class PracticalCoursesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public PracticalCoursesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/PracticalCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PracticalCourse>>> Getpractical_courses()
        {
            return await _context.practical_courses.Include("Applicant").Include("Teacher").ToListAsync();
        }

        // GET: api/PracticalCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PracticalCourse>> GetPracticalCourse(int id)
        {
            var practicalCourse = _context.practical_courses.Include("Applicant").Include("Teacher").Where(p => p.id == id);

            if (practicalCourse == null)
            {
                return NotFound();
            }

            return Ok(practicalCourse);
        }

        // PUT: api/PracticalCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPracticalCourse(int id, [FromForm] PracticalCourse practicalCourse)
        {
            if (id != practicalCourse.id)
            {
                return BadRequest();
            }

            practicalCourse.updated_at = DateTime.Now;
            _context.Entry(practicalCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PracticalCourseExists(id))
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

        // POST: api/PracticalCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PracticalCourse>> PostPracticalCourse([FromForm] PracticalCourse practicalCourse)
        {
            _context.practical_courses.Add(practicalCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPracticalCourse", new { id = practicalCourse.id }, practicalCourse);
        }

        // DELETE: api/PracticalCourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PracticalCourse>> DeletePracticalCourse(int id)
        {
            var practicalCourse = await _context.practical_courses.FindAsync(id);
            if (practicalCourse == null)
            {
                return NotFound();
            }

            _context.practical_courses.Remove(practicalCourse);
            await _context.SaveChangesAsync();

            return practicalCourse;
        }

        private bool PracticalCourseExists(int id)
        {
            return _context.practical_courses.Any(e => e.id == id);
        }
    }
}
