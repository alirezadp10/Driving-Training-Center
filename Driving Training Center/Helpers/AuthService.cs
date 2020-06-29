using DataLayer;
using Driving_Training_Center.Controllers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Driving_Training_Center.Helpers
{
    public interface IAuthService
    {
        IEnumerable generateJwtToken(string code);
    };

    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;

        public AuthService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public IEnumerable generateJwtToken(string national_code)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            DateTime expires = DateTime.UtcNow.AddDays(7);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, national_code)
                }),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var response = new Dictionary<string, dynamic> { };

            response["token_type"] = "Bearer";
            response["access_token"] = tokenHandler.WriteToken(token);
            response["expired_in"] = expires;

            return response;
        }
    }
}
