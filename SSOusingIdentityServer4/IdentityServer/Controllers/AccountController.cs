using IdentityServer.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using IdentityServer4.Services;

namespace IdentityServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IIdentityServerInteractionService _identityServerInteractionService;


        public AccountController(
            SignInManager<IdentityUser> signInManager, 
            UserManager<IdentityUser> userManager,
            IIdentityServerInteractionService identityServerInteractionService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _identityServerInteractionService = identityServerInteractionService;
        }


        #region 新規登録

        public IActionResult Register([FromQuery]string returnUrl)
        {
            ViewData["returnUrl"] = returnUrl ?? Url.Action("Index", "Home");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm]Register model, string returnUrl)
        {
            try
            {
                returnUrl = string.IsNullOrWhiteSpace(returnUrl) 
                    ? Url.Action("Index", "Home") 
                    : returnUrl;

                if (!ModelState.IsValid)
                {
                    throw new Exception("不正な入力です。");
                }

                var user = new IdentityUser(model.UserName)
                {
                    Email = model.Email,
                };
                
                var createUserResult = await _userManager.CreateAsync(
                    user: user,
                    password: model.Password);

                if (!createUserResult.Succeeded)
                {
                    foreach (var identityError in createUserResult.Errors)
                    {
                        ModelState.AddModelError("CreateUserError", identityError.Description);
                    }

                    throw new Exception("新規登録に失敗しました。");
                }

                var signInResult = await _signInManager.PasswordSignInAsync(
                    user: user,
                    password: model.Password,
                    isPersistent: false,
                    lockoutOnFailure: false);

                if (!signInResult.Succeeded)
                {
                    throw new Exception("ログインに失敗しました。");
                }

                return Url.IsLocalUrl(returnUrl)
                    ? (IActionResult) LocalRedirect(returnUrl)
                    : Redirect(returnUrl);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                
                ModelState.AddModelError("RegisterError", e.Message);
                
                ViewData["returnUrl"] = returnUrl;
                model.Password = "";

                return View(model);
            }
        }

        #endregion


        #region ログイン

        public IActionResult Login([FromQuery]string returnUrl)
        {
            ViewData["returnUrl"] = returnUrl ?? Url.Action("Index", "Home");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm]Login model, string returnUrl)
        {
            try
            {
                returnUrl = string.IsNullOrWhiteSpace(returnUrl) 
                    ? Url.Action("Index", "Home") 
                    : returnUrl;

                if (!ModelState.IsValid)
                {
                    throw new Exception("不正な入力です。");
                }

                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user is null)
                {
                    throw new Exception("メールアドレスまたはパスワードが間違っています。");
                }

                var signInResult = await _signInManager.PasswordSignInAsync(
                    user: user,
                    password: model.Password,
                    isPersistent: model.RememberMe,
                    lockoutOnFailure: false);

                if (!signInResult.Succeeded)
                {
                    throw new Exception("ログインに失敗しました。");
                }

                return Url.IsLocalUrl(returnUrl)
                    ? (IActionResult) LocalRedirect(returnUrl)
                    : Redirect(returnUrl);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                
                ModelState.AddModelError("LoginError", e.Message);
                
                ViewData["returnUrl"] = returnUrl;
                model.Password = "";

                return View(model);
            }
        }

        #endregion


        #region ログアウト

        public async Task<IActionResult> Logout([FromQuery]string logoutId)
        {
            await _signInManager.SignOutAsync();

            var logout = await _identityServerInteractionService.GetLogoutContextAsync(logoutId);
            var postRedirectUrl = logout?.PostLogoutRedirectUri;

            // NOTE: JSクライアントから受け取ったPostLogoutRedirectUriとIdentityServer4に登録しているPostLogoutRedirectUriが一致しない場合はNullになる
            return postRedirectUrl != null
                ? (IActionResult) Redirect(postRedirectUrl)
                : RedirectToAction("Index", "Home");
        }

        #endregion
    }
}
