import React from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import logo from "./images/Logo.png"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    label: {
        color: "black",
    },
    focusedLabel: {
        color: "black"
    },
}))

const Login = (props) => {
    const classes = useStyles();

    return (
        <div className={props.classes.modal} style={{borderRadius: "10%"}}>
            <form noValidate autoComplete="off">
                <Grid container 
                    direction="column"
                    alignItems="center"
                    xs= {12} 
                >
                    <Grid container item xs={3} style={{margin: "1%"}} >
                        <img src={logo} style={{width: "70%", marginLeft: "17px"}}/>
                    </Grid>
                    <Grid item xs={3} style={{margin: "3%", padding:"10px" , paddingTop:"0px"}} >
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
                    <Grid item xs={3} style={{margin: "3%", padding:"10px" , paddingTop:"0px"}}>
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
                    <Grid item xs={3} style={{margin: "3%", padding:"10px", paddingTop:"0"}}>
                        <Button>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Login
