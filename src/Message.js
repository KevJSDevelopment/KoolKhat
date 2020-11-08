import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { grid } from '@material-ui/system';


const Message = (props) => {
    return (
        <Grid container item 
          direction="row"
          alignItems="top"
          xs={12} 
          style={{marginBottom:"1%"}}
        >
            <Grid item xs={1} style={{margin: 5, marginLeft:"2%", marginRight: 0, padding: 0}}>
                <Paper style={{maxWidth: "50%", width: "100%"}}>
                    {props.user.username}:
                </Paper>
            </Grid>

            <Grid item xs={4} style={{margin: 5, marginLeft: 0, padding:0}}>
                <Paper elevation={3}>     
                    {props.message.text}
                </Paper>
                    <Typography variant= "subtitle2" style={{float: "right", font: "5", color: "#2bbd7e"}}>
                        {props.user.username}
                    </Typography>
            </Grid>

        </Grid>
    )
}

export default Message