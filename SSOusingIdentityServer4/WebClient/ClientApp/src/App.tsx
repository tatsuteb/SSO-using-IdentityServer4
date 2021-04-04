import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  
  const addErrorMessage = (message: string) => {
    const newErrorMessage = errorMessage !== ''
      ? `${errorMessage}\n${message}`
      : message;

    setErrorMessage(newErrorMessage);
  };
  
  return (
    <>
      <h1>Web Client</h1>

      <main>
          <Switch>
            <Route path='/' exact render={() => <Home addErrorMessage={addErrorMessage} />} />
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
    </>
  );
}

export default App;