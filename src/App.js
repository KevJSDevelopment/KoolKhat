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
import iconLogo from "./images/kklogo2.png"
import logo from "./images/loginbackground.png"
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
  const [loginOpen, setLoginOpen] = useState(false);
  // const [currentMessage, setCurrentMessage] = useState({})
  
  /**************************************************************************************************/ 

  const openWebSocket = (webSocketUrl, channelId) => {
    const socket = (new WebSocket(webSocketUrl))
    socket.onopen = event => {
      // console.log("rocket socket!!")

      const meta = {
          id: channelId,
          // change me!!!!
          channel: "ChannelChannel"

      }
      const msg = JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify(meta)
      })

      socket.send(msg)
    }
    return socket
  }

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
      setLoginOpen(false);
  };

  const login = (event) => {
    event.preventDefault()
    // debugger
    fetch(`http://localhost:3000/login/${event.target[0].value}`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({username: event.target[0].value, password: event.target[1].value})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      localStorage.setItem("token", data.token)
      setCurrentUser(data.user)
    })
    setLoginOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
    setLoginOpen(false);

  }


  const makeMessage = (words) => {
    if (!!localStorage.getItem("token")){
      fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authentication": `bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({message: words, channel_id: localStorage.getItem("channelId")})
      })
    }
    else {
      alert("you need to sign in")
    }
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

  const fetchUser = async () => {
    //make this dynamic
    // localStorage.setItem("channelId", 12) //hardsetting localStorage, make sure number is set properly
    const meta = {
      headers: {
        "Authentication": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const res = await fetch(`http://localhost:3000/login/user`, meta)

    const data = await res.json()
    setCurrentUser(data.user)
  }

  const getOldMessages = async () => {
    //make this dynamic
    // localStorage.setItem("channelId", 12) //hardsetting localStorage, make sure number is set properly
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
    //listen 
    getOldMessages()
  }

  useEffect(() => {

    if (!!localStorage.getItem("token")){
      fetchUser()
    }

    const stay = async () => {
      await getOldMessages()
    }

    stay()

    getChannels()

    const arr= [12,13]

    arr.map(channelId => {
      const socket = openWebSocket(cableURL, channelId)

      socket.onmessage = event => {
        setNewMessage(event)
      }

    })


  },[])

  return (
    <div className= {classes.root}>
      {/* <Typography variant= "h3">
          <img src= {logo} style={{maxWidth: "8%"}}/>
      </Typography> */}

      <DrawerAndNav handleLoginOpen={handleLoginOpen} handleLogout={handleLogout} channels={allChannels} setChannel={setMyChannel}/> 
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Container 
          className= {classes.container} 
          maxWidth= 'xl' 
          >
            <Grid container >
              {/* left side  */}

              {/* right side */}
              <ChatRoom classes={classes} makeMessage={makeMessage} messages={currentChannel.messages} currentUser={currentUser} />
            </Grid>   
          </Container>
        </main>
    </div>
  );
}

export default App