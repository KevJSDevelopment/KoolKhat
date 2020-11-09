import React, { useEffect, useState, useRef } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

import Message from "./Message"

const ChatRoom = (props) => {

    const messagesEndRef = useRef(null)  

    const scrollToBottom = () => {    
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })  
    }  

    useEffect(scrollToBottom, [props.messages]);  

    return (
        <Grid container item 
            direction="row"
            alignItems="top"  
            xs= {12} 
            className = {props.classes.chatSpace}
        >
            <Grid item xs= {12}>
                <Paper elevation={15} className={props.classes.paper} style={{height: window.innerHeight/1.40, overflow: "auto"}}>
                    {props.messages.sort((a,b) => a.data.id - b.data.id ).map(message => {
                        // console.log(message.data.id)
                        return <Message message={message.data} user={message.user} key={message.data.id}/>
                    })}
                <div ref={messagesEndRef} />
                </Paper>
            </Grid>

            <Grid 
            item xs= {12}
            >
                <Paper elevation={15} className={props.classes.paper} style= {{float: "center", width: "auto"}}>
                    <form 
                    autocomplete= 'off'
                    className= {props.classes.form} onSubmit={(e) => {
                            e.preventDefault()
                            if (!e.target[0].value == ""){
                                props.makeMessage(e.target[0].value)
                                e.currentTarget.reset()
                            }
                        }}>
                        <TextField placeholder= "" id="outlined-basic" label="Send Message" variant="outlined" style ={{width: "95%"}} />
                        <IconButton type= {"submit"} color="secondary" aria-label="send" style ={{align: "center"}}>
                            <TelegramIcon fontSize={"large"} style={{fill: "#2bbd7e"}}/>
                        </IconButton>
                    </form>
                </Paper>
            </Grid>
      </Grid>
    )
}

export default ChatRoom;