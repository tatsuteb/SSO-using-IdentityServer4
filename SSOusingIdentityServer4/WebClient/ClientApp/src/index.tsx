import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserAuthProvider } from './components/commons/UserAuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <Router>
        <App />
      </Router>
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);