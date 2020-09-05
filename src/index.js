import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Context/AuthContext'; // Ez felel a globális state beállításáért, amit a szerverről kér le. Ami ez alatt lesz ( Children elementek ) mind eléri a global stateket ( user, isAuthed )

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
