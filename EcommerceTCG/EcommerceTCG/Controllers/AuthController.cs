using EcommerceTCG.Data;
using EcommerceTCG.Models;
using EcommerceTCG.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace EcommerceTCG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EcommerceTcgContext _context;

        public AuthController(EcommerceTcgContext context)
        {
            _context = context;
        }


        private bool IsEmailValid(string email) =>
        Regex.IsMatch(email, @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        private bool IsPasswordValid(string password) =>
        Regex.IsMatch(password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$");

        private string HashPassword(string password)
        {
            // Genera un sale casuale
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Crea l'hash della password usando PBKDF2
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            // Combina sale e hash
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            // Converte in stringa base64
            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }

        private void SendConfirmEmail(string destinatario, string token)
        {
            //TODO - Sostituire con le proprie credenziali
            // Configura le impostazioni per l'invio dell'email
            string mittente = "napolitest14@gmail.com";
            string oggetto = "Conferma email";
            string corpo = $"Clicca sul link seguente per confermare la tua email: https://localhost:7289/api/Auth/confirmemail?email={destinatario}&token={token}";

            // Crea un oggetto MailMessage
            MailMessage message = new MailMessage(mittente, destinatario, oggetto, corpo);

            // Configura il client SMTP per l'invio dell'email
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("napolitest14@gmail.com", "kegv pdde knob lihp");
            smtpClient.EnableSsl = true;

            // Invia l'email
            smtpClient.Send(message);
        }
        private string GenerateEmailConfirmationToken(string email)
        {
            // Genera un token univoco utilizzando l'email e un timestamp
            string timestamp = DateTime.Now.Ticks.ToString();
            string token = email + timestamp;

            // Calcola l'hash del token utilizzando SHA256
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
                string hashedToken = Convert.ToBase64String(hashBytes);
                hashedToken = hashedToken.Replace("/", "").Replace("+", "").Replace("=", "");
                return hashedToken;
            }
        }

        private bool VerifyPassword(string enteredPassword, string savedPasswordHash)
        {
            // Converte l'hash salvato in un array di byte
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);

            // Estrae il sale
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Crea l'hash della password fornita utilizzando lo stesso sale
            var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            // Confronta l'hash della password fornita con l'hash salvato
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }

        [HttpGet]
        [Route("confirmemail")]
        public IActionResult ConfirmEmail(string email, string token)
        {
            // Trova l'utente nel database
            User user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user != null && user.EmailConfirmToken == token)
            {
                // Imposta il campo EmailVerificata a true
                user.EmailVerified = true;
                _context.SaveChanges();

                return Ok("Email confermata con successo!");
            }

            return BadRequest(new { message = "Token o indirizzo email non validi." });
        }

        /////////////////////// LOGIN //////////////////////////


        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginViewModel loginViewModel)
        {
            // Cerca l'utente nel database
            User dbUser = _context.Users.FirstOrDefault(u => u.Email == loginViewModel.Email);
            if (dbUser == null)
            {
                return BadRequest(new { message = "Utente non trovato." });
            }

            // Verifica la password
            if (!VerifyPassword(loginViewModel.Password, dbUser.PasswordHash))
            {
                return BadRequest(new { message = "Password non valida." });
            }

            if (!dbUser.EmailVerified)
            {
                return BadRequest(new { message = "Devi confermare l'email prima di effettuare il login." });
            }

            // Genera il token JWT
            string tokenString = GenerateJwtToken(dbUser);

            // Restituisci il token
            return Ok(new
            {
                Id = dbUser.UserId,
                Email = dbUser.Email,
                Token = tokenString
            });
        }

        //generate jwt token
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("unaChiaveSegretaMoltoMoltoLungaPerSoddisfareIRequisiti");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterViewModel registerViewModel)
        {
            // Verifica che l'email sia valida
            if (!IsEmailValid(registerViewModel.Email))
            {
                return BadRequest(new { message = "L'indirizzo email non è valido." });
            }

            // Verifica che la password sia valida
            if (!IsPasswordValid(registerViewModel.Password))
            {
                return BadRequest(new { message = "La password non è valida. Assicurati che la password soddisfi i requisiti." });
            }

            // Verifica che la password e la conferma password siano uguali
            if (registerViewModel.Password != registerViewModel.ConfirmPassword)
            {
                return BadRequest(new { message = "Le password non corrispondono." });
            }

            // Verifica che l'utente non esista già
            if (_context.Users.Any(u => u.Email == registerViewModel.Email))
            {
                return BadRequest(new { message = "Utente già registrato." });
            }

            string emailConfirmToken = GenerateEmailConfirmationToken(registerViewModel.Email);
            _context.Users.Add(new User
            {
                FirstName = registerViewModel.FirstName,
                LastName = registerViewModel.LastName,
                Email = registerViewModel.Email,
                PasswordHash = HashPassword(registerViewModel.Password),
                EmailConfirmToken = emailConfirmToken,
                RegistrationDate = DateTime.Now
            });



            _context.SaveChanges();
            SendConfirmEmail(registerViewModel.Email, emailConfirmToken);
            return Ok(new { message = "Utente registrato con successo." });
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            return Ok();
        }

        //[HttpPost]
        //[Route("forgotpassword")]
        //public IActionResult ForgotPassword([FromBody] User user)
        //{
        //    // Cerca l'utente nel database
        //    User dbUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
        //    if (dbUser == null)
        //    {
        //        return BadRequest(new { message = "Utente non trovato." });
        //    }

        //    // Genera un token per il reset della password
        //    string token = GenerateEmailConfirmationToken(user.Email);
        //    dbUser.PasswordResetToken = token;
        //    _context.SaveChanges();

        //    // Invia l'email con il link per il reset della password
        //    SendPasswordResetEmail(user.Email, token);

        //    return Ok(new { message = "Email inviata con successo." });
        //}


    }
}
