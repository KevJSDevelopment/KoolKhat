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
        >
            <Grid item xs={11}>
                <Paper>     
                    {props.message.text}
                </Paper>
            </Grid>

            <Grid item xs={1}>
                 <Paper>
                     
                    {props.message.user_id}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Message