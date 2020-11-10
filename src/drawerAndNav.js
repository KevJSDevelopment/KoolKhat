import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal'
import logo from "./images/Logo.png"

const drawerWidth = 180;

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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    '&:hover': {
        color: "white",
      }
  },
  hide: {
    display: 'none',
    color: "white"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: "#546e7a",
    color: "white"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#546e7a",
    color: "white"
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#546e7a",
    color: "white"
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
    },
  }

}));

const DrawerAndNav = (props) => {

  // console.log(props.channels)
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
                style= {{}}
            >
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Grid container xs={5} >
                      <Grid item xs={3} direction="column" style={!open ? {marginLeft: "40%"} : {marginLeft:"0"}}>
                        <Typography variant="" style={{float:"left", fontSize: "18px", color: "#2bbd7e"}}>
                          <i>Kool</i> 
                        </Typography>
                          <img src={logo} style={{width: "40%"}} alt="logo"/>
                        <Typography  variant="" style={{fontSize: "18px", color: "#9bffff"}}>
                          <i>Khat</i>
                        </Typography>
                      </Grid>
                    </Grid>
                      {!!localStorage.getItem("token") && localStorage.getItem("token") != "undefined" ? 
                      <Button onClick={props.handleLogout} className={classes.login}>
                        logout
                      </Button>
                        :
                      <Button onClick={props.handleLoginOpen} className={classes.login}>
                        login
                      </Button>
                      }
                </Toolbar>
            </AppBar>

            <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon style={{color: "white"}}/> : <ChevronLeftIcon style={{color: "white"}} />}
                    </IconButton>
                </div>
                <Divider />
                <br/>
                <br/>
                <Divider />
                <div style={{textAlign: "center", backgroundColor: "#29434e"}}>Friends</div>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem  button key={text}>
                        <ListItemIcon className={classes.list}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <div style={{textAlign: "center", backgroundColor: "#29434e"}}>Rooms</div>
                <Divider />
                <List >
                    {props.channels.map((channel) => (
                      <ListItem button key={channel.name} onClick={() => props.setChannel(channel)}>
                      <ListItemIcon className={classes.list} >  <InboxIcon /> </ListItemIcon>
                      <ListItemText primary={channel.name} />
                      </ListItem>
                  ))}
                </List>
                <Divider />
                <div style={{textAlign: "center", backgroundColor: "#29434e"}}>Settings</div>
                <Divider />
            </Drawer>
        </div>
    )
}

export default DrawerAndNav
