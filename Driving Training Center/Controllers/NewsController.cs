using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using System.IO;
using System.ComponentModel.DataAnnotations;
using System;
using Driving_Training_Center.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Driving_Training_Center.Controllers
{
    public class NewsRequest
    {
        [Required]
        public int id { get; set; }

        public DateTime updated_at { get; set; }

        [Required]
        public string title { get; set; }

        public string content { get; set; }

        [Required]
        public bool slide { get; set; }

        public int?[] categories { get; set; }
    }
    
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public NewsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Slider
        [HttpGet("slider")]
        public async Task<ActionResult<IEnumerable<News>>> Slider()
        {
            var news = _context.Set<sliderView>().FromSqlRaw("select * from [Slider View]");

            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);

        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> Getnews()
        {
            var news = _context.news.Include("Staff").ToList()
                .Join(_context.category_news, n => n.id, cn => cn.news_id, (n, cn) => new { news = n, category_news = cn })
                .Join(_context.categories, n => n.category_news.category_id, c => c.id, (n, c) => new { news = n, category = c })
                .Join(_context.images.Where(i => i.imageable_type == "News"), n => n.news.news.id, i => i.imageable_id, (n, i) => new { news = n, image = i })
                .GroupBy(q => q.news.news.news.id)
                .AsEnumerable()
                .Select(q => new
                {
                    id = q.Key,
                    title = q.Select(n => n.news.news.news.title).First(),
                    content = q.Select(n => n.news.news.news.content).First(),
                    slide = q.Select(n => n.news.news.news.slide).First(),
                    writer = new
                    {
                        id = q.Select(n => n.news.news.news.Staff.id).First(),
                        first_name = q.Select(n => n.news.news.news.Staff.first_name).First(),
                        last_name = q.Select(n => n.news.news.news.Staff.last_name).First(),
                    },
                    categories = q.Select(q => new
                    {
                        q.news.category.id,
                        q.news.category.name,
                    }),
                    image = Path.Combine("/images/md/", q.Select(n => n.image.name).First())
                });

            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = _context.news.Include("Staff").ToList()
                .Join(_context.category_news, n => n.id, cn => cn.news_id, (n, cn) => new { news = n, category_news = cn })
                .Join(_context.categories, n => n.category_news.category_id, c => c.id, (n, c) => new { news = n, category = c })
                .Join(_context.images.Where(i => i.imageable_type == "News"), n => n.news.news.id, i => i.imageable_id, (n, i) => new { news = n, image = i })
                .GroupBy(q => q.news.news.news.id)
                .Where(q => q.Key == id)
                .AsEnumerable()
                .Select(q => new
                {
                    id = q.Key,
                    title = q.Select(n => n.news.news.news.title).First(),
                    content = q.Select(n => n.news.news.news.content).First(),
                    slide = q.Select(n => n.news.news.news.slide).First(),
                    writer = new
                    {
                        id = q.Select(n => n.news.news.news.Staff.id).First(),
                        first_name = q.Select(n => n.news.news.news.Staff.first_name).First(),
                        last_name = q.Select(n => n.news.news.news.Staff.last_name).First(),
                    },
                    categories = q.Select(q => new
                    {
                        q.news.category.id,
                        q.news.category.name,
                    }),
                    image = Path.Combine("/images/md/", q.Select(n => n.image.name).First())
                });

            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        // PUT: api/News/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutNews(int id, [FromForm] NewsRequest request, IFormFile image)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if (staff == null)
            {
                return Unauthorized();
            }


            if (id != request.id)
            {
                return BadRequest();
            }

            var news = new News
            {
                title = request.title,
                content = request.content,
                slide = request.slide,
                updated_at = DateTime.Now,
                staff_id = staff.id,
            };

            _context.Entry(news).State = EntityState.Modified;

            if (request.categories != null)
            {
                _context.Entry(_context.category_news.Where(q => q.news_id == news.id)).State = EntityState.Deleted;
                foreach (int category_id in request.categories)
                {
                    var category = _context.categories.Find(category_id);
                    _context.category_news.Add(new CategoryNews
                    {
                        news_id = news.id,
                        category_id = category_id
                    });
                }
            }

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == request.id && i.imageable_type == "News")).FirstOrDefault();

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
                    imageable_type = "News"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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

        // POST: api/News
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<News>> PostNews([FromForm] NewsRequest request, IFormFile image)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var staff = _context.staffs.Where(q => q.national_code == national_code).FirstOrDefault();

            if(staff == null)
            {
                return Unauthorized();
            }

            var news = new News
            {
                title = request.title,
                content = request.content,
                slide = request.slide,
                staff_id = staff.id,
            };

            _context.news.Add(news);

            await _context.SaveChangesAsync();

            if (request.categories != null)
            {
                foreach (int category_id in request.categories)
                {
                    _context.category_news.Add(new CategoryNews
                    {
                        news_id = news.id,
                        category_id = category_id
                    });
                }
                await _context.SaveChangesAsync();
            }

            var image_name = ImagesHelper.save(image);

            var news_id = _context.news.Find(news.id).id;

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = news_id,
                imageable_type = "News"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNews", new { id = news.id }, news);
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<News>> DeleteNews(int id)
        {
            var news = await _context.news.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.news.Remove(news);

            var pImage = _context.images.Where(i => (i.imageable_id == news.id && i.imageable_type == "News")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = news.id,
                imageable_type = "News"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();
            return news;
        }

        private bool NewsExists(int id)
        {
            return _context.news.Any(e => e.id == id);
        }
    }
}
