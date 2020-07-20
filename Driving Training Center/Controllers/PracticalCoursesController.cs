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
    public class PracticalCourseRequest
    {
        public int teacher_id { get; set; }
        public int schedule_id { get; set; }
    }



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
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<ActionResult<PracticalCourse>> PostPracticalCourse([FromForm] PracticalCourseRequest practicalCourse)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }


            var course = new PracticalCourse
            {
                teacher_id = practicalCourse.teacher_id,
                applicant_id = applicant.id,
                start_date = DateTime.Now,
                license_type = "پایه ۳",
                total_sessions = 10
            };

            _context.practical_courses.Add(course);

            await _context.SaveChangesAsync();

            var schedule = new SchedulePracticalCourse
            {
                schedule_id = practicalCourse.schedule_id,
                practical_course_id = course.id
            };

            _context.schedule_practical_courses.Add(schedule);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPracticalCourse", new { id = course.id }, course);
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
