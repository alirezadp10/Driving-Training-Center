using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Driving_Training_Center.Controllers
{
    [Route("api/Theory-Courses")]
    [ApiController]
    public class TheoryCoursesController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public TheoryCoursesController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/TheoryCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TheoryCourse>>> Gettheory_courses()
        {
            var courses = _context.theory_courses.Include("Staff").ToList()
                            .Join(_context.images.Where(i => i.imageable_type == "TheoryCourse"), n => n.id, i => i.imageable_id, (n, i) => new { course = n, image = i })
                            .GroupBy(q => q.course.id)
                            .Select(q => new
                            {
                                id = q.Key,
                                license_type = q.Select(q => q.course.license_type).First(),
                                title = q.Select(q => q.course.title).First(),
                                image = System.IO.Path.Combine("/Images/lg/", q.Select(q => q.image.name).First()),
                            });

            //var response = new Dictionary<string, List<dynamic>>();

            //var paye1 = new List<dynamic>();
            //var paye2 = new List<dynamic>();
            //var paye3 = new List<dynamic>();
            //var motorcycle = new List<dynamic>();

            //foreach (dynamic course in courses)
            //{
            //    if (course.type == "پایه ۱")
            //    {
            //        paye1.Add(course);
            //    }
            //    if (course.type == "پایه 2")
            //    {
            //        paye2.Add(course);
            //    }
            //    if (course.type == "پایه 3")
            //    {
            //        paye3.Add(course);
            //    }
            //    if (course.type == "موتورسیکلت")
            //    {
            //        motorcycle.Add(course);
            //    }
            //}

            //response.Add("پایه ۱", paye1);
            //response.Add("پایه 2", paye2);
            //response.Add("پایه 3", paye3);
            //response.Add("موتورسیکلت", motorcycle);

            return Ok(courses);
        }

        // GET: api/TheoryCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TheoryCourse>> GetTheoryCourse(int id)
        {
            var theoryCourse = _context.theory_courses.Include("Staff").Where(q => q.id == id);

            if (theoryCourse == null)
            {
                return NotFound();
            }

            return Ok(theoryCourse);
        }

        // PUT: api/TheoryCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<TheoryCourse>> PutTheoryCourse(int id, [FromForm] TheoryCourse theoryCourse, IFormFile image)
        {
            theoryCourse.updated_at = DateTime.Now;
            _context.Entry(theoryCourse).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == theoryCourse.id && i.imageable_type == "TheoryCourse")).FirstOrDefault();

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
                    imageable_id = theoryCourse.id,
                    imageable_type = "TheoryCourse"
                }).State = EntityState.Modified;
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheoryCourseExists(id))
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

        // POST: api/TheoryCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TheoryCourse>> PostTheoryCourse([FromForm] TheoryCourse theoryCourse, IFormFile image)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if (staff == null)
            {
                return Unauthorized();
            }

            theoryCourse.staff_id = staff.id;

            await _context.SaveChangesAsync();

            var image_name = ImagesHelper.save(image);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = theoryCourse.id,
                imageable_type = "TheoryCourse"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheoryCourse", new { id = theoryCourse.id }, theoryCourse);
        }

        // DELETE: api/TheoryCourses/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<TheoryCourse>> DeleteTheoryCourse(int id)
        {
            var theoryCourse = await _context.theory_courses.FindAsync(id);
            if (theoryCourse == null)
            {
                return NotFound();
            }

            _context.theory_courses.Remove(theoryCourse);
            await _context.SaveChangesAsync();

            return theoryCourse;
        }

        private bool TheoryCourseExists(int id)
        {
            return _context.theory_courses.Any(e => e.id == id);
        }
    }
}
