using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using System.IO;
using Driving_Training_Center.Helpers;

namespace Driving_Training_Center.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficersController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public OfficersController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Officers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Officer>>> Getofficers()
        {
            return await _context.officers.ToListAsync();
        }

        // GET: api/Officers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Officer>> GetOfficer(int id)
        {
            var officer = _context.officers
                    .Join(_context.images.Where(i => i.imageable_type == "Officer"), s => s.id, i => i.imageable_id, (s, i) => new { officer = s, image = i })
                    .Where(q => q.officer.id == id)
                    .AsEnumerable()
                    .Select(q => new
                    {
                        q.officer.id,
                        q.officer.first_name,
                        q.officer.last_name,
                        q.officer.national_code,
                        q.officer.birthdate,
                        q.officer.phone,
                        q.officer.salary,
                        image = Path.Combine("/Images/md/", q.image.name)
                    });

            if (officer == null)
            {
                return NotFound();
            }

            return Ok(officer);
        }

        // PUT: api/Officers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOfficer(int id, [FromForm] Officer officer, IFormFile image)
        {
            if (id != officer.id)
            {
                return BadRequest();
            }
            officer.updated_at = DateTime.Now;
            _context.Entry(officer).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == officer.id && i.imageable_type == "Officer")).FirstOrDefault();

                ImagesHelper.delete(pImage.name);

                image_name = ImagesHelper.save(image);

                var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

                if (local != null)
                {
                    _context.Entry(local).State = EntityState.Detached;
                }

                _context.Entry(new Image
                {
                    id = pImage.id,
                    name = image_name,
                    imageable_id = officer.id,
                    imageable_type = "Officer"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfficerExists(id))
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

        // POST: api/Officers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Officer>> PostOfficer([FromForm] Officer officer, IFormFile image)
        {
            _context.officers.Add(officer);

            string image_name = ImagesHelper.save(image);

            await _context.SaveChangesAsync();

            var officer_id = _context.officers.Find(officer.id).id;

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = officer_id,
                imageable_type = "Officer"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOfficer", new { id = officer.id }, officer);
        }

        // DELETE: api/Officers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Officer>> DeleteOfficer(int id)
        {
            var officer = await _context.officers.FindAsync(id);
            if (officer == null)
            {
                return NotFound();
            }

            _context.officers.Remove(officer);

            var pImage = _context.images.Where(i => (i.imageable_id == officer.id && i.imageable_type == "Officer")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = officer.id,
                imageable_type = "Officer"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();
            return officer;
        }

        private bool OfficerExists(int id)
        {
            return _context.officers.Any(e => e.id == id);
        }
    }
}
