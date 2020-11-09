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
import logo from "./images/kklogo2.png"
import DrawerAndNav from "./drawerAndNav"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#819ca9", //light blue
    margin: 0,
    padding: 0,
    border: 0,
    maxHeight: "100%",
    height: window.innerHeight,
    flexGrow: 1,
    display: 'flex',
    

  },
  paper: {
    background: "#29434e", //dark blue
    margin: 5,
    padding: 0,
    border: 0,
    
  },
  container: {
    width: "full",
    margin: 0,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    border: 0,
    align: "center"
    
  },
  form:{
    align: "center"
  },
  info:{
    background: "#819ca9"
  },
  chatSpace: {
    background: "#819ca9",
    // padding 10,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
  
 
}));

const App = (props) => {
  //globals
  const cableURL = "ws://localhost:3000/cable"

  //hooks
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null)
  const [allChannels, setAllChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({channel: {}, messages: []})
  // const [currentMessage, setCurrentMessage] = useState({})
  
  /**************************************************************************************************/ 

  const openWebSocket = (webSocketUrl, server) => {
    const socket = (new WebSocket(webSocketUrl))
    socket.onopen = event => {
      // console.log("rocket socket!!")

      const meta = {
          id: localStorage.getItem("channelId"),
          // change me!!!!
          channel: server

      }
      console.log(meta)
      const msg = JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify(meta)
      })

      socket.send(msg)
    }
    return socket
  }
  

  const makeMessage = (words) => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({message: words, channel_id: localStorage.getItem("channelId")})
    })
  }

  const setNewMessage = (event) =>  {
    const evData = event.data
    const response = JSON.parse(evData)
    if(response.type === "ping"){
      return;
    }
    else if (response.message) {
      setCurrentChannel(prevState => ({...prevState, messages: [...prevState.messages, response.message.message_info]}))
    }
  }

  const getOldMessages = async () => {
    //make this dynamic
    //localStorage.setItem("channelId", 7) //hardsetting localStorage, make sure number is set properly
    const res = await fetch(`http://localhost:3000/channels/${localStorage.getItem("channelId")}`)
    const data = await res.json()
    setCurrentChannel((prevState) => ({...prevState, channel: data.channel, messages: data.message_info}))
  }

  const getChannels = () => {
    fetch("http://localhost:3000/channels")
      .then(res => res.json())
      .then(channels => {
        setAllChannels(channels)
    })
  }

  const setMyChannel = (channel) => {
    localStorage.setItem("channelId", channel.id)
    getOldMessages()
  }

  useEffect(() => {

    const stay = async () => {
      await getOldMessages()
    }

    stay()

    getChannels()

    const socket = openWebSocket(cableURL, "ChannelChannel")

    socket.onmessage = event => {
      setNewMessage(event)
    }

  },[])

  return (
    <div className= {classes.root}>
      {/* <Typography variant= "h3">
          <img src= {logo} style={{maxWidth: "8%"}}/>
      </Typography> */}

      <DrawerAndNav channels={allChannels} setChannel={setMyChannel}/> 
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Container 
          className= {classes.container} 
          maxWidth= 'xl' 
          >
            <Grid container >
              {/* left side  */}

              {/* right side */}
              <ChatRoom classes={classes} makeMessage={makeMessage} messages={currentChannel.messages} />
            </Grid>   
          </Container>
        </main>
    </div>
  );
}

export default App