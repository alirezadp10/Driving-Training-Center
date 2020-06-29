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
    [Route("api/Schedule-Practical-Courses")]
    [ApiController]
    public class SchedulePracticalCoursesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public SchedulePracticalCoursesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/SchedulePracticalCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SchedulePracticalCourse>>> Getschedule_practical_courses()
        {
            return await _context.schedule_practical_courses.Include("Schedule").Include("PracticalCourse").ToListAsync();
        }

        // GET: api/SchedulePracticalCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SchedulePracticalCourse>> GetSchedulePracticalCourse(int id)
        {
            var schedulePracticalCourse = _context.schedule_practical_courses.Include("Schedule").Include("PracticalCourse").Where(q => q.id == id);

            if (schedulePracticalCourse == null)
            {
                return NotFound();
            }

            return Ok(schedulePracticalCourse);
        }

        // PUT: api/SchedulePracticalCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedulePracticalCourse(int id, [FromForm] SchedulePracticalCourse schedulePracticalCourse)
        {
            if (id != schedulePracticalCourse.id)
            {
                return BadRequest();
            }

            schedulePracticalCourse.updated_at = DateTime.Now;
            _context.Entry(schedulePracticalCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SchedulePracticalCourseExists(id))
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

        // POST: api/SchedulePracticalCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SchedulePracticalCourse>> PostSchedulePracticalCourse([FromForm] SchedulePracticalCourse schedulePracticalCourse)
        {
            _context.schedule_practical_courses.Add(schedulePracticalCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedulePracticalCourse", new { id = schedulePracticalCourse.id }, schedulePracticalCourse);
        }

        // DELETE: api/SchedulePracticalCourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SchedulePracticalCourse>> DeleteSchedulePracticalCourse(int id)
        {
            var schedulePracticalCourse = await _context.schedule_practical_courses.FindAsync(id);
            if (schedulePracticalCourse == null)
            {
                return NotFound();
            }

            _context.schedule_practical_courses.Remove(schedulePracticalCourse);
            await _context.SaveChangesAsync();

            return schedulePracticalCourse;
        }

        private bool SchedulePracticalCourseExists(int id)
        {
            return _context.schedule_practical_courses.Any(e => e.id == id);
        }
    }
}
