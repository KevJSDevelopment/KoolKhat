import React from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import logo from "./images/Logo.png"
const Login = (props) => {
    return (
        <div className={props.classes.modal} style={{borderRadius: "10%"}}>
            <form noValidate autoComplete="off">
                <Grid container 
                    direction="column"
                    alignItems="center"
                    xs= {12} 
                >
                    <Grid item xs={3} style={{margin: "1%"}} >
                        <img src={logo} style={{width: "70%", marginLeft: "17px"}}/>
                    </Grid>
                    <Grid item xs={3} style={{margin: "3%", padding:"10px" , paddingTop:"0px"}} >
                        <TextField placeholder="" id="standard-basic" label="Username"/>
                    </Grid>
                    <Grid item xs={3} style={{margin: "3%", padding:"10px" , paddingTop:"0px"}}>
                        <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password"/>
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
