import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
// import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography'
import Runner from "./Runner"



const theme = createMuiTheme({

  typography: {
      //for any general settings to be added accross the website
      h3: {
        textAlign: "center"
      }

  },
  palette: {
    primary: {
      main: "#2bbd7e" 
    },
    secondary: {
      main: "#9fffe0" //Another orange-ish color
    }
  },
  fontFamily: 'roboto' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
  <ThemeProvider 
  theme={theme}>
      <Typography />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Runner />
        </BrowserRouter>
      <Typography />
  </ThemeProvider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//something something service worker ... 
//serviceWorker.unregister()