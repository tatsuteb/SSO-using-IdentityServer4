using IdentityServer.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;

        public Startup(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppIdentityDbContext>(options =>
                options.UseInMemoryDatabase("identityDb"));

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
                {
                    // デモ用に制約を緩めに設定
                    if (_environment.IsDevelopment())
                    {
                        options.User.RequireUniqueEmail = true;

                        options.Password.RequireDigit = false;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                    }

                    // その他いろいろ設定できる
                    // options.SignIn.RequireConfirmedAccount = true;
                    // options.SignIn.RequireConfirmedEmail = true;
                    // options.SignIn.RequireConfirmedPhoneNumber = true;
                })
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<AppIdentityDbContext>();

            // ログイン画面等のパスを変えたい場合はここで指定できる
            // services.ConfigureApplicationCookie(config =>
            // {
            //     config.LoginPath = "/Login";
            //     config.LogoutPath = "/Logout";
            //     config.AccessDeniedPath = "/AccessDenied";
            // });

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // endpoints.MapControllerRoute(
                //     name: "default",
                //     pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
