using DataLayer;
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Driving_Training_Center.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public StaffsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Staffs
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Staff>>> Getstaffs()
        {
            return await _context.staffs.ToListAsync();
        }

        // GET: api/Staffs/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Staff>> GetStaff(int id)
        {
            var staff = _context.staffs
                    .Join(_context.images.Where(i => i.imageable_type == "Staff"), s => s.id, i => i.imageable_id, (s, i) => new { staff = s, image = i })
                    .Where(q => q.staff.id == id)
                    .AsEnumerable()
                    .Select(q => new
                    {
                        q.staff.id,
                        q.staff.first_name,
                        q.staff.last_name,
                        q.staff.gender,
                        q.staff.role,
                        q.staff.national_code,
                        q.staff.birthdate,
                        q.staff.phone,
                        q.staff.salary,
                        image = Path.Combine("/Images/md/", q.image.name)
                    });

            if (staff == null)
            {
                return NotFound();
            }

            return Ok(staff);
        }

        // PUT: api/Staffs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutStaff(int id, [FromForm] Staff staff, IFormFile image)
        {
            if (id != staff.id)
            {
                return BadRequest();
            }
            staff.password = SecurePasswordHasher.Hash(staff.password);
            staff.updated_at = DateTime.Now;
            _context.Entry(staff).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == staff.id && i.imageable_type == "Staff")).FirstOrDefault();

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
                    imageable_id = staff.id,
                    imageable_type = "Staff"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
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

        // POST: api/Staffs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Staff>> PostStaff([FromForm] Staff staff, IFormFile image)
        {
            staff.password = SecurePasswordHasher.Hash(staff.password);
            _context.staffs.Add(staff);

            await _context.SaveChangesAsync();

            string image_name = ImagesHelper.save(image);

            var staff_id = _context.staffs.Find(staff.id).id;

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = staff_id,
                imageable_type = "Staff"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaff", new { id = staff.id }, staff);
        }

        // DELETE: api/Staffs/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Staff>> DeleteStaff(int id)
        {
            var staff = await _context.staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            _context.staffs.Remove(staff);

            var pImage = _context.images.Where(i => (i.imageable_id == staff.id && i.imageable_type == "Staff")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = staff.id,
                imageable_type = "Staff"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();
            return staff;
        }

        private bool StaffExists(int id)
        {
            return _context.staffs.Any(e => e.id == id);
        }
    }
}
