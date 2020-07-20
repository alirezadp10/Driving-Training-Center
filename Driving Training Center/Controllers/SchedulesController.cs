using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using System.Collections;
using System.IO;
using System.ComponentModel.DataAnnotations;
using LinqKit;

namespace Driving_Training_Center.Controllers
{
    public class TS
    {
        public int teacher_id { get; set; }

        public Dictionary<string, List<string>> schedule { get; set; }
    }

    public class TePredict
    {
        public int id { get; set; }
        public string day { get; set; }
        public string from { get; set; }
        public string until { get; set; }
    }

    public class TeacherPredict
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string description { get; set; }
        public string license_type { get; set; }
        public string image { get; set; }
        public string day { get; set; }
        public string from { get; set; }
        public string until { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public SchedulesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // Post: api/Schedules/teachers
        [HttpPost("teachers")]
        public async Task<ActionResult<IEnumerable>> GetTeachersSchedule([FromForm] TS request)
        {
            var query = _context.teachers
                .Join(_context.images.Where(i => i.imageable_type == "Teacher"), l => l.id, i => i.imageable_id, (l, i) => new { teachers = l, image = i })
                .Join(_context.schedule_teachers, q => q.teachers.id, p => p.teacher_id, (q, p) => new { teachers = q, schedule_teacher = p })
                .Join(_context.schedules, q => q.schedule_teacher.schedule_id, p => p.id, (q, p) => new { teachers = q, schedules = p })
                .Select(q => new TeacherPredict
                {
                    image = Path.Combine("/Images/md/", q.teachers.teachers.image.name),
                    id = q.teachers.teachers.teachers.id,
                    first_name = q.teachers.teachers.teachers.first_name,
                    last_name = q.teachers.teachers.teachers.last_name,
                    license_type = q.teachers.teachers.teachers.license_type,
                    description = q.teachers.teachers.teachers.description,
                    day = q.schedules.day,
                    until = q.schedules.until,
                    from = q.schedules.from,
                });

            var predicate = PredicateBuilder.False<TeacherPredict>();

            foreach (var times in request.schedule)
            {
                foreach (var time in times.Value)
                {
                    string[] parts = time.Split('-');
                    predicate = predicate.Or(q => q.day == times.Key && q.from == parts[0] && q.until == parts[1]);
                }
            };

            return query.Where(predicate).ToList().GroupBy(q => q.id).Select(q => new
            {
                id = q.Key,
                first_name = q.Select(q => q.first_name).First(),
                last_name = q.Select(q => q.last_name).First(),
                license_type = q.Select(q => q.license_type).First(),
                description = q.Select(q => q.description).First(),
                image = Path.Combine("/Images/md/", q.Select(q => q.image).First()),
            }).ToList();
        }

        // Post: api/Schedules/teacher
        [HttpPost("teacher")]
        public async Task<ActionResult<IEnumerable>> GetTeacherSchedule([FromForm] TS request)
        {
            var query = _context.teachers
                .Join(_context.schedule_teachers, q => q.id, p => p.teacher_id, (q, p) => new { teachers = q, schedule_teacher = p })
                .Join(_context.schedules, q => q.schedule_teacher.schedule_id, p => p.id, (q, p) => new { teachers = q, schedules = p })
                .Where(q => q.teachers.teachers.id == request.teacher_id)
                .Select(q => new TePredict
                {
                    id = q.schedules.id,
                    day = q.schedules.day,
                    until = q.schedules.until,
                    from = q.schedules.from,
                });

            var predicate = PredicateBuilder.False<TePredict>();

            foreach (var times in request.schedule)
            {
                foreach (var time in times.Value)
                {
                    string[] parts = time.Split('-');
                    predicate = predicate.Or(q => q.day == times.Key && q.from == parts[0] && q.until == parts[1]);
                }
            };

            return query.Where(predicate).ToList();
        }

        // GET: api/Schedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Schedule>>> Getschedules()
        {
            return await _context.schedules.ToListAsync();
        }

        // GET: api/Schedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> GetSchedule(int id)
        {
            var schedule = await _context.schedules.FindAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // PUT: api/Schedules/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule(int id, [FromForm] Schedule schedule)
        {
            if (id != schedule.id)
            {
                return BadRequest();
            }

            schedule.updated_at = DateTime.Now;
            _context.Entry(schedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
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

        // POST: api/Schedules
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Schedule>> PostSchedule([FromForm] Schedule schedule)
        {
            _context.schedules.Add(schedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedule", new { id = schedule.id }, schedule);
        }

        // DELETE: api/Schedules/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Schedule>> DeleteSchedule(int id)
        {
            var schedule = await _context.schedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _context.schedules.Remove(schedule);
            await _context.SaveChangesAsync();

            return schedule;
        }

        private bool ScheduleExists(int id)
        {
            return _context.schedules.Any(e => e.id == id);
        }
    }
}
