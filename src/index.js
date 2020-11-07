import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography'

const theme = createMuiTheme({

  typography: {
      //for any general settings to be added accross the website
      h1: {
        textAlign: "center"
      }

  },
  palette: {
    primary: {
      main: "#c85a54" 
    },
    secondary: {
      main: "#c85a54" //Another orange-ish color
    }
  },
  fontFamily: 'roboto' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
  <ThemeProvider 
    theme={theme}>
    <Typography />
      <App />
    <Typography />
  </ThemeProvider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//something something service worker ... 
//serviceWorker.unregister()