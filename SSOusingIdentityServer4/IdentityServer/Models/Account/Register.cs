using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Models.Account
{
    public class Register
    {
        [Required(ErrorMessage = "{0}を入力してください。")]
        [StringLength(maximumLength: 32, MinimumLength = 1, ErrorMessage = "{0}は{2}～{1}文字で設定してください。")]
        [DisplayName("ユーザー名")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "{0}を入力してください。")]
        [DataType(DataType.EmailAddress)]
        [DisplayName("メールアドレス")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0}を入力してください。")]
        [DataType(DataType.Password)]
        [DisplayName("パスワード")]
        public string Password { get; set; }
    }
}
