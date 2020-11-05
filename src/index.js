import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import actionCable from 'actioncable'

const CableApp = {}

CableApp.cable = actionCable.createConsumer('wss://localhost:3000/cable')

ReactDOM.render(
  <Router>
    <App cableApp= {CableApp} />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//something something service worker ... 
//serviceWorker.unregister()