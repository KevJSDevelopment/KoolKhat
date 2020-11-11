import React from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
// import { Typography } from '@material-ui/core'
import logo from "./images/Logo.png"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    label: {
        color: "black",
        width: "100%"
    },
    focusedLabel: {
        color: "black"
    },
    button:{
        
        '&:hover': {
            backgroundColor: "#2bbd7e",
            color: "white"
          },
    }
}))

const Login = (props) => {
    const classes = useStyles();

    return (
        <div className={props.classes.modal} style={{borderRadius: "10%"}}>
            <form noValidate autoComplete="off" onSubmit={(ev) => {
                props.login(ev)
                // localStorage.getItem("user") ? props.handleLoginClose() : null
            }}>
                <Grid container 
                    direction="column"
                    // alignItems="center"
                    xs= {12} 
                >
                    <Grid container item xs={12} style={{margin: "1%"}} direction="row">
                        <img src={logo} style={{width: "20%", marginLeft: "17px"}} alt="logo"/>
                    </Grid>
                    <Grid item xs={12} style={{margin: "1%", padding:"10px" , paddingTop:"0px"}} >
                        <TextField 
                        placeholder="" 
                        id="standard-basic" 
                        label="Username"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focusedLabel
                            }
                        }} 
                        />
                    </Grid>
                    <Grid item xs={12} style={{margin: "1%", padding:"10px" , paddingTop:"0px"}}>
                        <TextField 
                        id="standard-password-input" 
                        label="Password" 
                        type="password" 
                        autoComplete="current-password"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focusedLabel
                            }
                        }} 
                        />
                    </Grid>
                    <Grid item xs={12} style={{margin: "3%", padding:"10px", paddingTop:"0"}}>
                        <Button type="submit" className= {classes.button}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Login
