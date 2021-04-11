import { useContext } from 'react';
import { userAuthContext } from '../commons/UserAuthProvider';

const LogInMenu = () => {
  const auth = useContext(userAuthContext);

  if (auth === null) {
    return null;
  }

  return (
    <>
      {auth.userInfo !== null ?
        <>
          <span>{auth.userInfo?.name}</span>
          <button onClick={() => auth.logOut()}>ログアウト</button>
        </> :
        <>
          <button onClick={() => auth.logIn()}>ログイン</button>
          <a href={`https://localhost:5001/Account/Register?returnUrl=${window.encodeURIComponent(window.location.href)}`}>新規登録</a>
        </>
      }
    </>
  );
};

export default LogInMenu;