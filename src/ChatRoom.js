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

const useStyles = makeStyles((theme) => ({
    label: {
        color: "white",
    },
    focusedLabel: {
        color: "#2bbd7e"
    },
    text: {
        color: "#FFFFFF"
    }
  }))

const ChatRoom = (props) => {

    const classes = useStyles();

    const messagesEndRef = useRef(null)  

    const scrollToBottom = () => {    
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })  
    }  

    useEffect(scrollToBottom, [props.messages]);  

    // debugger

    return (
        <Grid container item 
            direction="row"
            alignItems="top"  
            xs= {12} 
            className = {props.classes.chatSpace}
        >
            <Grid item xs={12}>
                <Typography variant='h4' style={{textAlign: "center", color: "#FFFFFF"}}>
                    <i> {props.channel.name} changed</i>
                </Typography>
            </Grid>
            <Grid item xs= {12}>

                <Paper elevation={15} className={props.classes.paper} style={{height: window.innerHeight/1.50, overflowY: "auto", overflowX: "hidden"}}>
                    {props.messages.sort((a,b) => a.data.id - b.data.id ).map(message => {
                        // console.log(message.data.id)
                        return <Message message={message.data} user={message.user} currentUser={props.currentUser} key={message.data.id}/>
                    })}
                <div ref={messagesEndRef} />
                </Paper>
            </Grid>

            <Grid 
            item xs= {12}
            >
                <Paper elevation={15} className={props.classes.paper} style= {{float: "center", width: "auto"}}>
                    <form 
                    autoComplete= 'off'
                    className= {props.classes.form} onSubmit={(e) => {
                            e.preventDefault()
                            if (!e.target[0].value == ""){
                                props.makeMessage(e.target[0].value)
                                e.currentTarget.reset()
                            }
                        }}>
                        <TextField 
                        placeholder="" 
                        id="outlined-basic" 
                        label="Send Message" 
                        variant="outlined"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focusedLabel
                            }
                        }} 
                        InputProps={{ className: classes.text}}
                        style ={{ color: "white" , width: "94%"}} 
                        />
                        <IconButton type= {"submit"} color="secondary" aria-label="send" style={{align: "center"}}>
                            <TelegramIcon fontSize={"large"} style={{fill: "#2bbd7e"}}/>
                        </IconButton>
                    </form>
                </Paper>
            </Grid>
      </Grid>
    )
}

export default ChatRoom;