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
    public class SessionsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public SessionsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Sessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> Getsessions()
        {
            return await _context.sessions.Include("PracticalCourse").Include("Vehicle").ToListAsync();
        }

        // GET: api/Sessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            var session = _context.sessions.Include("PracticalCourse").Include("Vehicle").Where(q => q.id == id);

            if (session == null)
            {
                return NotFound();
            }

            return Ok(session);
        }

        // PUT: api/Sessions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, [FromForm] Session session)
        {
            if (id != session.id)
            {
                return BadRequest();
            }

            session.updated_at = DateTime.Now;
            _context.Entry(session).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionExists(id))
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

        // POST: api/Sessions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Session>> PostSession([FromForm] Session session)
        {
            _context.sessions.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSession", new { id = session.id }, session);
        }

        // DELETE: api/Sessions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Session>> DeleteSession(int id)
        {
            var session = await _context.sessions.FindAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            _context.sessions.Remove(session);
            await _context.SaveChangesAsync();

            return session;
        }

        private bool SessionExists(int id)
        {
            return _context.sessions.Any(e => e.id == id);
        }
    }
}
