import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { grid } from '@material-ui/system';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Message = (props) => {
    return (
        <div>
            {props.currentUser.username != props.user.username ?  
            <Grid container item 
            direction="row"
            alignItems="top"
            xs={12} 
            style={{marginBottom:"1%"}}
            >
                <Grid item xs={0} style={{margin: 5, marginLeft:"2%", marginRight: 0, padding: 0}}>
                        <AccountCircleIcon style={{fill: props.user.icon, backgroundColor: props.user.background, borderRadius: "15px"}}/>
                </Grid>

                <Grid item xs={5} style={{margin: 5, marginLeft: 10, padding:0}}>
                    <Paper elevation={3}>     
                        {props.message.text}
                    </Paper>
                        <Typography variant= "subtitle2" style={{float: "right", font: "5", color: "#2bbd7e"}}>
                            {props.user.username}
                        </Typography>
                </Grid>

            </Grid>
            : 
            <Grid container item 
            direction="row"
            alignItems="top"
            xs={12} 
            style={{marginBottom:"1%", marginLeft: "51%"}}
            >
                
                <Grid item xs={5} style={{margin: 5, marginLeft: 10, padding:0}}>
                    <Paper elevation={3}>     
                        {props.message.text}
                    </Paper>
                        <Typography variant= "subtitle2" style={{float: "left", font: "5", color: "#2bbd7e"}}>
                            {props.user.username}
                        </Typography>
                </Grid>

                <Grid item xs={0} style={{margin: 5, marginLeft:"2%", marginRight: 0, padding: 0}}>
                        <AccountCircleIcon style={{fill: props.user.icon, backgroundColor: props.user.background, borderRadius: "15px"}}/>
                </Grid>

            </Grid>
            }
        </div>
    )
}

export default Message