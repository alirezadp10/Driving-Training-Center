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
    public class SchedulesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public SchedulesController(DrivingTrainingCenterContext context)
        {
            _context = context;
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
