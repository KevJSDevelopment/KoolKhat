import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { grid } from '@material-ui/system';

const Info = (props) => {
    return (
        <Grid container item 
          direction="row"
          alignItems="top"
          xs={2} 
          className={props.classes.info}
        >
            <Grid item xs={12}>
              <Paper className={props.classes.paper} style= {{height: window.innerHeight/1.5}}>
                Channels
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={props.classes.paper} style= {{height: window.innerHeight/5}}>
                Settings
              </Paper>
            </Grid>
        </Grid>
    )
}

export default Info