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
    [Route("api/Schedule-Teachers")]
    [ApiController]
    public class ScheduleTeachersController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public ScheduleTeachersController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/ScheduleTeachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleTeacher>>> Getschedule_teachers()
        {
            return await _context.schedule_teachers.Include("Schedule").Include("Teacher").ToListAsync();
        }

        // GET: api/ScheduleTeachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleTeacher>> GetScheduleTeacher(int id)
        {
            var scheduleTeacher = _context.schedule_teachers.Include("Schedule").Include("Teacher").Where(q=>q.id == id);

            if (scheduleTeacher == null)
            {
                return NotFound();
            }

            return Ok(scheduleTeacher);
        }

        // PUT: api/ScheduleTeachers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScheduleTeacher(int id, [FromForm] ScheduleTeacher scheduleTeacher)
        {
            if (id != scheduleTeacher.id)
            {
                return BadRequest();
            }

            scheduleTeacher.updated_at = DateTime.Now;
            _context.Entry(scheduleTeacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleTeacherExists(id))
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

        // POST: api/ScheduleTeachers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ScheduleTeacher>> PostScheduleTeacher([FromForm] ScheduleTeacher scheduleTeacher)
        {
            _context.schedule_teachers.Add(scheduleTeacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScheduleTeacher", new { id = scheduleTeacher.id }, scheduleTeacher);
        }

        // DELETE: api/ScheduleTeachers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ScheduleTeacher>> DeleteScheduleTeacher(int id)
        {
            var scheduleTeacher = await _context.schedule_teachers.FindAsync(id);
            if (scheduleTeacher == null)
            {
                return NotFound();
            }

            _context.schedule_teachers.Remove(scheduleTeacher);
            await _context.SaveChangesAsync();

            return scheduleTeacher;
        }

        private bool ScheduleTeacherExists(int id)
        {
            return _context.schedule_teachers.Any(e => e.id == id);
        }
    }
}
