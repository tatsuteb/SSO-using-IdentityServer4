import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userAuthContext } from '../commons/UserAuthProvider';

const LogInCallback = () => {
  const auth = useContext(userAuthContext);
  const history = useHistory();

  useEffect(() => {
    // logInCallback() を連続で呼ぶと No state in response エラーになる
    if (auth?.userInfo !== null) {
      return;
    }

    auth?.logInCallback()
      .then(returnUrl => {
        history.push(returnUrl);
      });
  }, [auth, history]);

  return (<h2>ログインコールバック</h2>);
};

export default LogInCallback;