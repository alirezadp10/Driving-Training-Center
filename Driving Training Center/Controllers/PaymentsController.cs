using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using Microsoft.AspNetCore.Authorization;

namespace Driving_Training_Center.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly DrivingTrainingCenterContext _context;

        public PaymentsController(DrivingTrainingCenterContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> Getpayments()
        {
            return await _context.payments.Include("Applicant").Include("License").ToListAsync();
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.payments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        // PUT: api/Payments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPayment(int id, [FromForm]  int license_id)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }

            var payment = new Payment
            {
                applicant_id = applicant.id,
                license_id = license_id,
                updated_at = DateTime.Now
            };

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // POST: api/Payments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Payment>> PostPayment([FromForm] int license_id)
        {
            var identity = User.Identity as System.Security.Claims.ClaimsIdentity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            var national_code = claims.Where(p => p.Type == "national_code").FirstOrDefault()?.Value;

            var applicant = _context.applicants.Where(q => q.national_code == national_code).FirstOrDefault();

            if (applicant == null)
            {
                return Unauthorized();
            }

            var payment = new Payment
            {
                applicant_id = applicant.id,
                license_id = license_id,
            };

            _context.payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayment", new { id = payment.id }, payment);
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Payment>> DeletePayment(int id)
        {
            var payment = await _context.payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.payments.Remove(payment);
            await _context.SaveChangesAsync();

            return payment;
        }

        private bool PaymentExists(int id)
        {
            return _context.payments.Any(e => e.id == id);
        }
    }
}
