import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if(!process.env.REACT_APP_BACKEND_URL){
  process.env.REACT_APP_BACKEND_URL = 'http://localhost:5000';
}
if(!process.env.REACT_APP_BACKEND_WS_URL){
  process.env.REACT_APP_BACKEND_WS_URL = 'ws://localhost:3030';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
