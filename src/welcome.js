import React,{useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core';
import logo from "./images/Logo.png"
import backgroundLogo from "./images/loginbackground.png"
import Modal from '@material-ui/core/Modal'
import Login from "./Login"
import Signup from "./Signup"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"

const loginTheme = createMuiTheme({
  palette: {
    primary:{
      main: "#000000"
    },
    secondary: {
      main: "#000000",
    },
  },
});


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#29434e",
    color: "#FFFFFF"
  },
  list: {
    color: "white",
    '&:hover': {
        color: "#29434e",
      }
  },
  login: {
    color: "#FFFFFF",
    backgroundColor: "#29434e",
    '&:hover': {
      backgroundColor: "#2bbd7e",
    }
  },
  signUp: {
    color: "#FFFFFF",
    backgroundColor: "#29434e",
    '&:hover': {
      backgroundColor: "#22d5db",
      color: "black"
    },
  },
  modal: {
    width: '30%',
    maxWidth: '100vw',
    maxHeight: '100%',
    position: 'fixed',
    top: '25%',
    left: '35%',
    overflow: 'auto',
    height: "50%",
    background: "whitesmoke",
    backgroundImage: `url(${backgroundLogo})`,
    backgroundSize: "auto",
    border: "3px solid white"
  },
}));


const Welcome = (props) => {
  const classes = useStyles();
    
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
      setLoginOpen(false);
  };

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
      setSignupOpen(false);
  };

  

  return (
    <div>
      <AppBar
      position="fixed"
      className={clsx(classes.appBar)} 
      >
        <Toolbar style={{justifyContent: "space-between"}}>
          <Grid container xs={5} direction="row" >
            <Grid item xs={3} direction="column">
              <Typography variant="inherit" style={{float:"left", fontSize: "18px", color: "#2bbd7e"}}>
                <i>Kool</i> 
              </Typography>
                <img src={logo} style={{width: "40%"}} alt="logo"/>
              <Typography  variant="inherit" style={{fontSize: "18px", color: "#9bffff"}}>
                <i>Khat</i>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={handleSignupOpen} className={classes.signUp}>
              Sign up
            </Button>
            <Button onClick={handleLoginOpen} className={classes.login}>
              Login
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>

      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <ThemeProvider theme={loginTheme}>
            <Login classes={classes} login={props.login} handleLoginClose={handleLoginClose}/>
          </ThemeProvider>
      </Modal>

      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <ThemeProvider theme={loginTheme}>
            <Signup classes={classes} signup={props.signup} handleSignupClose={handleSignupClose}/>
          </ThemeProvider>
      </Modal>

    </div>
  );
}

export default Welcome