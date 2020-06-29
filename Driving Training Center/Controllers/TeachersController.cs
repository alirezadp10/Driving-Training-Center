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
    public class TeachersController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public TeachersController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> Getteachers()
        {
            var teachers= _context.teachers
                .Join(_context.images.Where(i => i.imageable_type == "Teacher"), s => s.id, i => i.imageable_id, (s, i) => new { teacher = s, image = i })
                .AsEnumerable()
                .Select(q => new
                {
                    q.teacher.id,
                    q.teacher.first_name,
                    q.teacher.last_name,
                    q.teacher.gender,
                    q.teacher.national_code,
                    q.teacher.birthdate,
                    q.teacher.phone,
                    q.teacher.license_type,
                    q.teacher.salary,
                    q.teacher.description,
                    image = Path.Combine("/images/md/", q.image.name)
                });

            return Ok(teachers);
        }

        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var teacher = _context.teachers
                .Join(_context.images.Where(i => i.imageable_type == "Teacher"), s => s.id, i => i.imageable_id, (s, i) => new { teacher = s, image = i })
                .Where(q => q.teacher.id == id)
                .AsEnumerable()
                .Select(q => new
                {
                    q.teacher.id,
                    q.teacher.first_name,
                    q.teacher.last_name,
                    q.teacher.gender,
                    q.teacher.national_code,
                    q.teacher.birthdate,
                    q.teacher.phone,
                    q.teacher.license_type,
                    q.teacher.salary,
                    q.teacher.description,
                    image = Path.Combine("/images/md/", q.image.name)
                });

            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }

        // PUT: api/Teachers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(int id, [FromForm] Teacher teacher, IFormFile image)
        {
            if (id != teacher.id)
            {
                return BadRequest();
            }
            
            teacher.updated_at = DateTime.Now;
            _context.Entry(teacher).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == teacher.id && i.imageable_type == "Teacher")).FirstOrDefault();

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
                    imageable_id = teacher.id,
                    imageable_type = "Teacher"
                }).State = EntityState.Modified;
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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

        // POST: api/Teachers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher([FromForm] Teacher teacher, IFormFile image)
        {
            _context.teachers.Add(teacher);
            await _context.SaveChangesAsync();

            string image_name = ImagesHelper.save(image);

            var teacher_id = _context.teachers.Find(teacher.id).id;

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = teacher_id,
                imageable_type = "Teacher"
            });

            await _context.SaveChangesAsync();


            return CreatedAtAction("GetTeacher", new { id = teacher.id }, teacher);
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Teacher>> DeleteTeacher(int id)
        {
            var teacher = await _context.teachers.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.teachers.Remove(teacher);
            await _context.SaveChangesAsync();


            var pImage = _context.images.Where(i => (i.imageable_id == teacher.id && i.imageable_type == "Teacher")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = teacher.id,
                imageable_type = "Teacher"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();

            return teacher;
        }

        private bool TeacherExists(int id)
        {
            return _context.teachers.Any(e => e.id == id);
        }
    }
}
