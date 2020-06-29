using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using System.IO;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Driving_Training_Center.Helpers;

namespace Driving_Training_Center.Controllers
{
    public class QuestionRequest
    {
        [Required]
        public int id { get; set; }

        public DateTime updated_at { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public int correct_answer { get; set; }

        [Required]
        public int theory_exam_id { get; set; }

        [Required]
        public string[] option { get; set; }

        public string options { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public QuestionsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> Getquestions()
        {
            var questions = _context.questions.Include("TheoryExam").ToList()
                .Join(_context.images.Where(i => i.imageable_type == "Question"), l => l.id, i => i.imageable_id, (q, i) => new { question = q, image = i })
                .Join(_context.staffs, q => q.question.TheoryExam.staff_id, s => s.id, (q, s) => new { question = q, staff = s })
                .AsEnumerable()
                .Select(q => new
                {
                    q.question.question.id,
                    q.question.question.title,
                    q.question.question.options,
                    q.question.question.correct_answer,
                    writer = new
                    {
                        q.staff.id,
                        q.staff.first_name,
                        q.staff.last_name,
                    },
                    image = Path.Combine("/images/md/", q.question.image.name)
                });

            return Ok(questions);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = _context.questions.Include("TheoryExam").ToList()
                .Join(_context.images.Where(i => i.imageable_type == "Question"), l => l.id, i => i.imageable_id, (q, i) => new { question = q, image = i })
                .Join(_context.staffs, q => q.question.TheoryExam.staff_id, s => s.id, (q, s) => new { question = q, staff = s })
                .AsEnumerable().Where(q => q.question.question.id == id).Select(q => new
                {
                    q.question.question.id,
                    q.question.question.title,
                    q.question.question.options,
                    q.question.question.correct_answer,
                    q.question.question.TheoryExam.license_type,
                    writer = new
                    {
                        q.staff.id,
                        q.staff.first_name,
                        q.staff.last_name,
                    },
                    image = Path.Combine("/images/md/", q.question.image.name)
                });


            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, [FromForm] QuestionRequest request, IFormFile image)
        {
            var list = new List<string>();

            foreach (string option in request.option)
            {
                list.Add(option);
            }

            request.options = JsonConvert.SerializeObject(list);

            var question = new Question
            {
                title = request.title,
                options = request.options,
                theory_exam_id = request.theory_exam_id,
                correct_answer = request.correct_answer,
                updated_at = DateTime.Now,
            };

            _context.Entry(question).State = EntityState.Modified;

            if (image != null)
            {
                string image_name;

                var pImage = _context.images.Where(i => (i.imageable_id == request.id && i.imageable_type == "Question")).FirstOrDefault();

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
                    imageable_type = "Question"
                }).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // POST: api/Questions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion([FromForm] QuestionRequest request, IFormFile image)
        {
            var list = new List<string>();

            foreach (string option in request.option)
            {
                list.Add(option);
            }

            request.options = JsonConvert.SerializeObject(list);

            var question = new Question
            {
                title = request.title,
                options = request.options,
                theory_exam_id = request.theory_exam_id,
                correct_answer = request.correct_answer
            };

            _context.questions.Add(question);

            await _context.SaveChangesAsync();

            var image_name = ImagesHelper.save(image);

            _context.images.Add(new Image
            {
                name = image_name,
                imageable_id = question.id,
                imageable_type = "Question"
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(int id)
        {
            var question = await _context.questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.questions.Remove(question);
            await _context.SaveChangesAsync();

            var pImage = _context.images.Where(i => (i.imageable_id == question.id && i.imageable_type == "Question")).FirstOrDefault();

            var local = _context.Set<Image>().Local.FirstOrDefault(i => i.id == pImage.id);

            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }

            _context.images.Remove(new Image
            {
                id = pImage.id,
                name = pImage.name,
                imageable_id = question.id,
                imageable_type = "Question"
            });

            ImagesHelper.delete(pImage.name);
            await _context.SaveChangesAsync();

            return question;
        }

        private bool QuestionExists(int id)
        {
            return _context.questions.Any(e => e.id == id);
        }
    }
}
