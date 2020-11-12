import React from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
// import { Typography } from '@material-ui/core'
import logo from "./images/Logo.png"
import { makeStyles } from '@material-ui/core/styles';
import backgroundLogo from './images/loginbackground.png'

const useStyles = makeStyles((theme) => ({
    label: {
        color: "black",
        width: "100%"
    },
    focusedLabel: {
        color: "black"
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
        border: "3px solid white",
        borderRadius: "10%"
      },
}))

const EditProfile = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.modal}>
            <form noValidate autoComplete="off" onSubmit={(ev) => {
                props.changeProfile(ev)
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
                        placeholder="name or hex"
                        id="standard-basic" 
                        label="Icon color"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focusedLabel
                            }
                        }} 
                        />
                    </Grid>
                    <Grid item xs={12} style={{margin: "1%", padding:"10px" , paddingTop:"0px"}} >
                        <TextField 
                        placeholder="name or hex" 
                        id="standard-basic" 
                        label="Icon background color"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focusedLabel
                            }
                        }} 
                        />
                    </Grid>
                    <Grid item xs={12} style={{margin: "3%", padding:"10px", paddingTop:"0"}}>
                        <Button type="submit" style={{background: "#2bbd7e"}}>
                            save changes
                        </Button>
                        <br/>
                        Refresh page for changes
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default EditProfile
