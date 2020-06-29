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
    public class LessonsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public LessonsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Lessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> Getlessons()
        {
            var lessons = _context.lessons.Include("TheoryCourse").ToList()
    .Join(_context.images.Where(i => i.imageable_type == "Lesson"), l => l.id, i => i.imageable_id, (l, i) => new { lesson = l, image = i })
    .Join(_context.staffs, l => l.lesson.TheoryCourse.staff_id, s => s.id, (l, s) => new { lesson = l, staff = s })
    .AsEnumerable()
    .Select(q => new
    {
        q.lesson.lesson.title,
        q.lesson.lesson.content,
        q.lesson.lesson.TheoryCourse.license_type,
        writer = new
        {
            q.staff.id,
            q.staff.first_name,
            q.staff.last_name,
        },
        image = Path.Combine("/Images/lg/", q.lesson.image.name)
    });
            return Ok(lessons);

        }

        // GET: api/Lessons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var lesson = _context.lessons.Include("TheoryCourse").ToList()
               .Join(_context.images.Where(i => i.imageable_type == "Lesson"), l => l.id, i => i.imageable_id, (l, i) => new { lesson = l, image = i })
               .Join(_context.staffs, l => l.lesson.TheoryCourse.staff_id, s => s.id, (l, s) => new { lesson = l, staff = s })
               .AsEnumerable().Where(q => q.lesson.lesson.id == id).Select(q => new
               {
                   q.lesson.lesson.title,
                   q.lesson.lesson.content,
                   q.lesson.lesson.TheoryCourse.license_type,
                   writer = new
                   {
                       q.staff.id,
                       q.staff.first_name,
                       q.staff.last_name,
                   },
                   image = Path.Combine("/Images/lg/", q.lesson.image.name)
               });


            if (lesson == null)
            {
                return NotFound();
            }

            return Ok(lesson);
        }

        // PUT: api/Lessons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLesson(int id, [FromForm]Lesson lesson, IFormFile image)
        {
            if (id != lesson.id)
            {
                return BadRequest();
            }

            lesson.updated_at = DateTime.Now;
            _context.Entry(lesson).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == lesson.id && i.imageable_type == "Lesson")).FirstOrDefault();

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
                    imageable_id = lesson.id,
                    imageable_type = "Lesson"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonExists(id))
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

        // POST: api/Lessons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Lesson>> PostLesson([FromForm]Lesson lesson, IFormFile image)
        {
            _context.lessons.Add(lesson);
            await _context.SaveChangesAsync();

            var image_name = ImagesHelper.save(image);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = lesson.id,
                imageable_type = "Lesson"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLesson", new { id = lesson.id }, lesson);
        }

        // DELETE: api/Lessons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lesson>> DeleteLesson(int id)
        {
            var lesson = await _context.lessons.FindAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            _context.lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            var pImage = _context.images.Where(i => (i.imageable_id == lesson.id && i.imageable_type == "Lesson")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = lesson.id,
                imageable_type = "Lesson"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();

            return lesson;
        }

        private bool LessonExists(int id)
        {
            return _context.lessons.Any(e => e.id == id);
        }
    }
}
