import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { grid } from '@material-ui/system';
import Message from "./Message"

const ChatRoom = (props) => {

    return (
        <Grid container item 
            direction="row"
            alignItems="top"  
            xs= {10} 
            className = {props.classes.chatSpace}
        >
            <Grid item xs= {12}>
                <Paper className={props.classes.paper} style={{height: window.innerHeight/1.15}}>
                    {props.messages.map(message => {
                        return <Message message={message}/>
                    })}
                </Paper>
            </Grid>

            <Grid item xs= {12}>
                <Paper className={props.classes.paper} style= {{float: "right"}}>
                    <form className= {props.classes.form} onSubmit={(e) => {
                            e.preventDefault()
                            props.makeMessage(e.target[0].value)
                            }}>
                        <input type="text" />
                        <input type="submit" />
                    </form>
                </Paper>
            </Grid>
      </Grid>
    )
}

export default ChatRoom;