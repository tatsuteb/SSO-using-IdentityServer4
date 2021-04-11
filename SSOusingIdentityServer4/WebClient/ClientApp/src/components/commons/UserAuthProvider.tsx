import React, { createContext, useEffect, useMemo, useState } from 'react';
import { User, UserManager } from 'oidc-client';

interface UserInfo {
  name: string;
  accessToken: string;
}

interface UserAuth {
  userInfo: UserInfo | null,
  updateUserInfo: (user: User) => void,
  logIn: () => void;
  logInCallback: () => Promise<string>;
  logOut: () => void;
}

const useUserAuth = (): UserAuth => {
  const userManager = useMemo(() => new UserManager({
    authority: 'https://localhost:5001',
    client_id: 'js',
    redirect_uri: 'https://localhost:7001/callback',
    response_type: 'code',
    scope: 'openid profile offline_access api1',
    post_logout_redirect_uri: 'https://localhost:7001',
    automaticSilentRenew: true,
    silentRequestTimeout: 3000,
  }), []);
  
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (userInfo !== null) {
      return;
    }

    userManager.getUser()
      .then(user => {
        if (user === null) {
          setUserInfo(null);
          return;
        }

        setUserInfo({
          name: user.profile.name ?? '',
          accessToken: user.access_token
        });
      });
  }, [userManager, userInfo]);

  return ({
    userInfo: userInfo,
    updateUserInfo: (user: User) => {
      setUserInfo({
        name: user.profile.name ?? '',
        accessToken: user.access_token
      });
    },
    logIn: async () => {
      try {
        const user = await userManager.signinSilent({
          state: {
            returnUrl: window.location.pathname
          }
        });
        
        setUserInfo({
          name: user?.profile.name ?? '',
          accessToken: user.access_token
        });
      } catch (error) {
        await userManager.signinRedirect({
          state: {
            returnUrl: window.location.pathname
          }
        });
      }
    },
    logInCallback: async () => {
      // codeフローを使う場合、コールバックページで response_modeにqueryを指定したUserMangerを作らないと、No state in response みたいなエラーが出る！
      // https://github.com/IdentityModel/oidc-client-js/issues/780#issuecomment-470935675
      const newUserManager = new UserManager({
        response_mode: 'query'
      });

      const user = await newUserManager.signinRedirectCallback()

      setUserInfo({
        name: user.profile.name ?? '',
        accessToken: user.access_token
      });
      
      return user.state.returnUrl;
    },
    logOut: async () => {
      await userManager.signoutRedirect();
      setUserInfo(null);
    }
  });
};

export const userAuthContext = createContext<UserAuth | null>(null);

export const UserAuthProvider: React.FC = ({ children }) => {
  return (
    <userAuthContext.Provider value={useUserAuth()}>
      {children}
    </userAuthContext.Provider>
  );
};