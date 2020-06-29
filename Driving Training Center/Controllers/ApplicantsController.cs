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
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace Driving_Training_Center.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public ApplicantsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Applicants
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable>> Getapplicants()
        {
            return await _context.applicants.Select(q => new
            {
                q.id,
                q.first_name,
                q.last_name,
                q.gender,
                q.father_name,
                q.national_code,
                q.birthdate,
                q.education,
                q.phone,
                q.blood_type,
                q.status,
            }).ToListAsync();
        }

        // GET: api/Applicants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Applicant>> GetApplicant(int id)
        {
            var applicant = await _context.applicants.FindAsync(id);

            if (applicant == null)
            {
                return NotFound();
            }

            var response = new Dictionary<string, string>();

            response["id"] = applicant.id.ToString();
            response["first_name"] = applicant.first_name;
            response["last_name"] = applicant.last_name;
            response["gender"] = applicant.gender;
            response["father_name"] = applicant.father_name;
            response["national_code"] = applicant.national_code;
            response["birthdate"] = applicant.birthdate.ToString();
            response["education"] = applicant.education;
            response["phone"] = applicant.phone;
            response["blood_type"] = applicant.blood_type;
            response["status"] = applicant.status;

            var images = _context.images.Where(
                image => (image.imageable_type == "Applicant" || image.imageable_type == "National_Card" || image.imageable_type == "Birth_Certificate")
                && image.imageable_id == id)
                .AsEnumerable()
                .Select(image => new Image
                {
                    id = image.id,
                    name = image.name,
                    imageable_type = image.imageable_type
                });

            foreach (Image image in images)
            {
                response[image.imageable_type] = Path.Combine("/Images/md/", image.name);
            };

            return Ok(response);
        }

        // PUT: api/Applicants/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicant(int id, [FromForm] Applicant applicant, IFormFile avatar, IFormFile birth_certificate, IFormFile national_card)
        {
            if (id != applicant.id)
            {
                return BadRequest();
            }

            applicant.updated_at = DateTime.Now;
            applicant.password = SecurePasswordHasher.Hash(applicant.password);
            _context.Entry(applicant).State = EntityState.Modified;

            var images = new Dictionary<string, dynamic> { };

            var result = _context.images.Where(
                image => (image.imageable_type == "Applicant" || image.imageable_type == "National_Card" || image.imageable_type == "Birth_Certificate")
                && image.imageable_id == id)
                .AsEnumerable()
                .Select(image => new Image
                {
                    id = image.id,
                    name = image.name,
                    imageable_type = image.imageable_type
                });

            foreach (Image image in result)
            {
                images[image.imageable_type] = new
                {
                    image.id,
                    image.name
                };
            };

            string image_name;

            if (avatar != null)
            {
                ImagesHelper.delete(images["Applicant"].name);

                image_name = ImagesHelper.save(avatar);

                var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["Applicant"].id);

                if (local != null)
                {
                    _context.Entry(local).State = EntityState.Detached;
                }

                _context.Entry(new Image
                {
                    id = images["Applicant"].id,
                    name = image_name,
                    imageable_id = applicant.id,
                    imageable_type = "Applicant"
                }).State = EntityState.Modified;
            }

            if (birth_certificate != null)
            {
                ImagesHelper.delete(images["Birth_Certificate"].name);

                image_name = ImagesHelper.save(birth_certificate);

                var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["Birth_Certificate"].id);

                if (local != null)
                {
                    _context.Entry(local).State = EntityState.Detached;
                }
                _context.Entry(new Image
                {
                    id = images["Birth_Certificate"].id,
                    name = image_name,
                    imageable_id = applicant.id,
                    imageable_type = "Birth_Certificate"
                }).State = EntityState.Modified;
            }

            if (national_card != null)
            {
                ImagesHelper.delete(images["National_Card"].name);

                image_name = ImagesHelper.save(national_card);

                var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["National_Card"].id);

                if (local != null)
                {
                    _context.Entry(local).State = EntityState.Detached;
                }
                _context.Entry(new Image
                {
                    id = images["National_Card"].id,
                    name = image_name,
                    imageable_id = applicant.id,
                    imageable_type = "National_Card"

                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicantExists(id))
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

        // POST: api/Applicants
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Applicant>> PostApplicant([FromForm] Applicant applicant, IFormFile avatar, IFormFile birth_certificate, IFormFile national_card)
        {
            applicant.status = "PENDING";
            applicant.password = SecurePasswordHasher.Hash(applicant.password);
            _context.applicants.Add(applicant);

            string image_name = ImagesHelper.save(avatar);

            await _context.SaveChangesAsync();

            var applicant_id = _context.applicants.Find(applicant.id).id;

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = applicant_id,
                imageable_type = "Applicant"
            });

            image_name = ImagesHelper.save(birth_certificate);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = applicant_id,
                imageable_type = "Birth_Certificate"
            });


            image_name = ImagesHelper.save(national_card);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = applicant_id,
                imageable_type = "National_Card"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicant", new { id = applicant.id }, applicant);
        }

        // DELETE: api/Applicants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Applicant>> DeleteApplicant(int id)
        {
            var applicant = await _context.applicants.FindAsync(id);
            if (applicant == null)
            {
                return NotFound();
            }

            _context.applicants.Remove(applicant);

            var images = new Dictionary<string, dynamic> { };


            var result = _context.images.Where(
                image => (image.imageable_type == "Applicant" || image.imageable_type == "National_Card" || image.imageable_type == "Birth_Certificate")
                && image.imageable_id == id)
                .AsEnumerable()
                .Select(image => new Image
                {
                    id = image.id,
                    name = image.name,
                    imageable_type = image.imageable_type
                });

            foreach (Image image in result)
            {
                images[image.imageable_type] = new
                {
                    image.id,
                    image.name
                };
            };

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["Applicant"].id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["Birth_Certificate"].id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == images["National_Card"].id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = images["Applicant"].id,
                name = images["Applicant"].name,
                imageable_id = applicant.id,
                imageable_type = "Applicant"
            });

            _context.images.Remove(new Image
            {
                id = images["Birth_Certificate"].id,
                name = images["Birth_Certificate"].name,
                imageable_id = applicant.id,
                imageable_type = "Birth_Certificate"
            });

            _context.images.Remove(new Image
            {
                id = images["National_Card"].id,
                name = images["National_Card"].name,
                imageable_id = applicant.id,
                imageable_type = "National_Card"
            });

            ImagesHelper.delete(images["Applicant"].name);
            ImagesHelper.delete(images["Birth_Certificate"].name);
            ImagesHelper.delete(images["National_Card"].name);

            await _context.SaveChangesAsync();
            return applicant;
        }

        private bool ApplicantExists(int id)
        {
            return _context.applicants.Any(e => e.id == id);
        }
    }
}
