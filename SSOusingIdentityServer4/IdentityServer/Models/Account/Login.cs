using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Models.Account
{
    public class Login
    {
        [Required(ErrorMessage = "{0}を入力してください。")]
        [DataType(DataType.EmailAddress)]
        [DisplayName("メールアドレス")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0}を入力してください。")]
        [DataType(DataType.Password)]
        [DisplayName("パスワード")]
        public string Password { get; set; }

        [DisplayName("ログイン状態を保存")]
        public bool RememberMe { get; set; }
    }
}
