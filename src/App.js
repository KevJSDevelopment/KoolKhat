import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { grid } from '@material-ui/system';
import ChatRoom from './ChatRoom'
import Info from './Info';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ff8a80",
    margin: 0,
    padding: 0,
    border: 0,
    
    flexGrow: 1,

  },
  paper: {
    background: "grey",
    margin: 5,
    padding: 0,
    border: 0,
  },
  container: {
    background: "#ff8a80",
    align: "center",
    width: "full",
    margin: 0,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    border: 0
  },
  form:{
    align: "center"
  },
  info:{
    background: "lightGreen"
  },
  chatSpace: {
    background: "lightGreen"
  }
  
 
}));

const App = (props) => {
  //globals
  const cableURL = "ws://localhost:3000/cable"

  //hooks
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null)
  const [allChannels, setAllChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({channel: {}, users: [], messages: []})
  const [currentMessage, setCurrentMessage] = useState({})

  /**************************************************************************************************/ 


  const openWebSocket = (webSocketUrl, channel) => {
    const socket = (new WebSocket(webSocketUrl))
    socket.onopen = event => {
      console.log("rocket socket!!")

      const msg = JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: 1,
          channel: channel
        })
      })

      socket.send(msg)
    }
    return socket
  }
  

  const makeMessage = (words) => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({message: words})
    })
  }

  useEffect(() => {

    console.log("hit useEffect")
    //fetching channel in case we need the information... 
    //prob not going to be in final code ... 
    //prob fetch user and user will have their channels 
    
    //turn into fetching user after login 
    fetch("http://localhost:3000/channels/1")
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setCurrentChannel({...currentChannel, channel: data})
    })
    
    //openning websocket
    const socket = openWebSocket(cableURL, "ChannelChannel")

    socket.onmessage = event => {
      // debugger
      const response = event.data
      const msg = JSON.parse(response)
      // debugger
      if(msg.type === "ping"){
        return;
      }
      else if (msg.message) {
        // debugger
        // console.log(msg.message.message.text)
        setCurrentMessage(msg.message.message)
        let newMsgArr = currentChannel.messages
        newMsgArr.push(msg.message.message)
        setCurrentChannel({...currentChannel, messages: newMsgArr})
      }
    }

  },[])

  return (
    <div className= {classes.root}>
      <Typography variant= "h1">
          Kool Kids section
      </Typography>

      {/* <NavBar/> */} 
   
      <Container className= {classes.container} maxWidth= 'xl'>
        <Grid container>
          {/* left side  */}
          <Info classes={classes} />

          {/* right side */}
          <ChatRoom classes={classes} makeMessage={makeMessage} messages={currentChannel.messages} />
        </Grid>   
      </Container>
    </div>
  );
}

export default App

