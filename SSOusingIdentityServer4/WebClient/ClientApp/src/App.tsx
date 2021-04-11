import { useContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AxiosProvider } from './components/commons/AxiosProvider';
import { userAuthContext } from './components/commons/UserAuthProvider';
import Home from './components/Home';
import LogInCallback from './components/LogInCallback';
import LogInMenu from './components/LogInMenu';

const App = () => {
  const auth = useContext(userAuthContext);

  const [errorMessage, setErrorMessage] = useState('');

  const addErrorMessage = (message: string) => {
    const newErrorMessage = errorMessage !== ''
      ? `${errorMessage}\n${message}`
      : message;

    setErrorMessage(newErrorMessage);
  };

  return (
    <AxiosProvider accessToken={auth?.userInfo?.accessToken}>
      <header>
        <h1>Web Client</h1>
        <LogInMenu />
      </header>

      <main>
        <Switch>
          <Route path='/' exact render={() => <Home addErrorMessage={addErrorMessage} />} />
          <Route path='/callback' component={LogInCallback} />
        </Switch>
      </main>

      <div style={{
        marginTop: '20px',
        width: '500px',
        height: '200px',
        border: '1px solid grey',
        color: 'red',
        whiteSpace: 'pre',
        overflow: 'scroll'
      }}>{errorMessage !== '' && errorMessage}</div>
    </AxiosProvider>
  );
}

export default App;