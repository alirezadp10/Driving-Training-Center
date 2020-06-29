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
    [Route("api/[controller]")]
    [ApiController]
    public class TheoryCoursesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public TheoryCoursesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/TheoryCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TheoryCourse>>> Gettheory_courses()
        {
            return await _context.theory_courses.Include("Staff").ToListAsync();
        }

        // GET: api/TheoryCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TheoryCourse>> GetTheoryCourse(int id)
        {
            var theoryCourse = _context.theory_courses.Include("Staff").Where(q => q.id == id);

            if (theoryCourse == null)
            {
                return NotFound();
            }

            return Ok(theoryCourse);
        }

        // PUT: api/TheoryCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheoryCourse(int id, [FromForm] TheoryCourse theoryCourse)
        {
            if (id != theoryCourse.id)
            {
                return BadRequest();
            }

            theoryCourse.updated_at = DateTime.Now;
            _context.Entry(theoryCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheoryCourseExists(id))
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

        // POST: api/TheoryCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TheoryCourse>> PostTheoryCourse([FromForm] TheoryCourse theoryCourse)
        {
            _context.theory_courses.Add(theoryCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheoryCourse", new { id = theoryCourse.id }, theoryCourse);
        }

        // DELETE: api/TheoryCourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TheoryCourse>> DeleteTheoryCourse(int id)
        {
            var theoryCourse = await _context.theory_courses.FindAsync(id);
            if (theoryCourse == null)
            {
                return NotFound();
            }

            _context.theory_courses.Remove(theoryCourse);
            await _context.SaveChangesAsync();

            return theoryCourse;
        }

        private bool TheoryCourseExists(int id)
        {
            return _context.theory_courses.Any(e => e.id == id);
        }
    }
}
