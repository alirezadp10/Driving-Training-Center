using DataLayer;
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Driving_Training_Center.Controllers
{
    public class LicenseRequest
    {
        [Required]
        public int id { get; set; }

        public DateTime updated_at { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public int cost { get; set; }

        [Required]
        public string[] condition { get; set; }

        public string conditions { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class LicensesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public LicensesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/licenses/cost
        [HttpGet("cost")]
        public async Task<ActionResult<IEnumerable>> Cost()
        {
            var response = new Dictionary<string, int>();
            var licenses = _context.licenses;
            foreach (var license in licenses)
            {
                response[license.name] = license.cost;
            };
            return Ok(licenses);
        }

        // GET: api/Licenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<License>>> Getlicenses()
        {
            var licenses = _context.licenses
                         .Join(_context.images.Where(i => i.imageable_type == "License"), l => l.id, i => i.imageable_id, (l, i) => new { license = l, image = i })
                         .AsEnumerable()
                         .Select(q => new
                         {
                             q.license.id,
                             q.license.name,
                             q.license.cost,
                             q.license.conditions,
                             image = Path.Combine("/Images/original/", q.image.name)
                         });

            return Ok(licenses);
        }

        // GET: api/Licenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<License>> GetLicense(int id)
        {
            var license = _context.licenses
                         .Join(_context.images.Where(i => i.imageable_type == "License"), l => l.id, i => i.imageable_id, (l, i) => new { license = l, image = i })
                         .Where(q => q.license.id == id)
                         .AsEnumerable()
                         .Select(q => new
                         {
                             q.license.id,
                             q.license.name,
                             q.license.cost,
                             q.license.conditions,
                             image = Path.Combine("/Images/original/", q.image.name)
                         });

            if (license == null)
            {
                return NotFound();
            }

            return Ok(license);
        }

        // PUT: api/Licenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLicense(int id, [FromForm] LicenseRequest request, IFormFile image)
        {
            var list = new List<string>();

            foreach (string condition in request.condition)
            {
                list.Add(condition);
            }

            request.conditions = JsonConvert.SerializeObject(list);

            var license = new License
            {
                name = request.name,
                cost = request.cost,
                conditions = request.conditions,
                updated_at = DateTime.Now,
            };

            _context.Entry(license).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == request.id && i.imageable_type == "License")).FirstOrDefault();

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
                    imageable_id = request.id,
                    imageable_type = "License"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LicenseExists(id))
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

        // POST: api/Licenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<License>> PostLicense([FromForm] LicenseRequest request, IFormFile image)
        {
            var list = new List<string>();
            
            foreach (string condition in request.condition)
            {
                list.Add(condition);
            }

            request.conditions = JsonConvert.SerializeObject(list);

            var license = new License
            {
                name = request.name,
                cost = request.cost,
                conditions = request.conditions
            };

            _context.licenses.Add(license);

            await _context.SaveChangesAsync();

            var image_name = ImagesHelper.save(image);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = license.id,
                imageable_type = "License"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLicense", new { id = license.id }, license);
        }

        // DELETE: api/Licenses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<License>> DeleteLicense(int id)
        {
            var license = await _context.licenses.FindAsync(id);
            if (license == null)
            {
                return NotFound();
            }

            _context.licenses.Remove(license);

            var pImage = _context.images.Where(i => (i.imageable_id == license.id && i.imageable_type == "License")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = license.id,
                imageable_type = "License"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();
            return license;
        }

        private bool LicenseExists(int id)
        {
            return _context.licenses.Any(e => e.id == id);
        }
    }
}
