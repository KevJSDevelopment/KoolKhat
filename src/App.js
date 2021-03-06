import './App.css';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import ChatRoom from './ChatRoom'
import DrawerAndNav from "./drawerAndNav"
import Modal from '@material-ui/core/Modal'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import NewChannel from './NewChannel'
import EditProfile from "./EditProfile"

const loginTheme = createMuiTheme({
  palette: {
    primary:{
      main: "#000000"
    },
    secondary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#819ca9", //light blue
    margin: 0,
    padding: 0,
    border: 0,
    maxHeight: "100%",
    height: window.innerHeight,
    flexGrow: 1,
    display: 'flex'
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
  const cableURL = "wss://stormy-savannah-56656.herokuapp.com/cable"

  //hooks
  const classes = useStyles();

  
  const [allChannels, setAllChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({channel: {}, messages: [], users: []})
  const [newChannelOpen, setNewChannelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  /**************************************************************************************************/ 
  
  
  const openWebSocket = (webSocketUrl, channelId) => {
    const socket = (new WebSocket(webSocketUrl))
    socket.onopen = event => {
      
      const meta = {
          id: channelId,
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



  const handleNewChannelOpen = () => {
    setNewChannelOpen(true);
  };

  const handleNewChannelClose = () => {
    setNewChannelOpen(false);
  };

  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };



  const handleLogout = () => {
    localStorage.removeItem("token")
    props.setCurrentUser(null)
    props.setToken(false)
  }



  const makeMessage = (words) => {
    if (!!localStorage.getItem("token")){
      fetch("https://stormy-savannah-56656.herokuapp.com/messages", {
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
    const meta = {
      headers: {
        "Authentication": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const res = await fetch(`https://stormy-savannah-56656.herokuapp.com/login/user`, meta)
    const data = await res.json()

    props.setCurrentUser(data.user)
  }

  const getOldMessages = async () => {
    const res = await fetch(`https://stormy-savannah-56656.herokuapp.com/channels/${localStorage.getItem("channelId")}`)
    
    const data = await res.json()
    console.log(data.users);
    if (!!data){
      setCurrentChannel((prevState) => ({...prevState, channel: data.channel, messages: data.message_info, users: data.users}))
    }
  }

  const getChannels = () => {
    fetch(`https://stormy-savannah-56656.herokuapp.com/channels`)
      .then(res => res.json())
      .then(async (channels) => {
        await setAllChannels(channels)
        subscribeToChannels(channels)
    })
  }

  const subscribeToChannels = (channels) => {
    const arr = channels 
    arr.map(channel => {
      localStorage.setItem("channelId", arr[0].id)
      const socket = openWebSocket(cableURL, channel.id)

      socket.onmessage = event => {
        setNewMessage(event)
      }
    })
  }

  const setMyChannel = (channel) => {
    localStorage.setItem("channelId", channel.id)
    getOldMessages()
  }

  const changeProfile = (ev) => {
    ev.preventDefault()

    const meta = {
      method: "PATCH",
      headers: {
        "Authentication": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        background: ev.target[1].value,
        icon: ev.target[0].value,
      })
    }


    fetch(`https://stormy-savannah-56656.herokuapp.com/users/${props.currentUser.id}`, meta)    
    .then(res => res.json())
    .then(async (data) => {
      if (data.auth){
        await props.setCurrentUser(data.user)
        handleProfileClose()
        console.log(data);
      }
      else{
        alert(data.info)
      }
    })
  }

  const createNewChannel = (ev) => {
    ev.preventDefault()
    
    fetch("https://stormy-savannah-56656.herokuapp.com/channels", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({name: ev.target[0].value })
    })
    .then(res => res.json())
    .then(async (channelInfo) => {
      if(channelInfo === "failed"){
        alert("Could not create channel")
      }
      else {
        const socket = openWebSocket(cableURL, channelInfo.id)
        
        socket.onmessage = event => {
          setNewMessage(event)
        }
        await setAllChannels(prevState => ([...prevState, channelInfo]))
        localStorage.setItem("channelId", channelInfo.id)
        getOldMessages()
        handleNewChannelClose()
      }
    })
  }

  useEffect(() => {

    if (!!localStorage.getItem("token")){
      fetchUser()
    }
    
    const awaitChannels = async () => {
      await getChannels()
      return;
    }

    const stay = async () => {
      await getOldMessages()
    }

    awaitChannels()

    stay()

  },[])

  return (
    <div className= {classes.root}>

      <DrawerAndNav handleNewChannelOpen={handleNewChannelOpen} handleLogout={handleLogout} channels={allChannels} users={currentChannel.users} setChannel={setMyChannel} handleProfileOpen={handleProfileOpen}/> 
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Container 
          className= {classes.container} 
          maxWidth= 'xl' 
          >
            <Grid container direction="row">
              <ChatRoom classes={classes} makeMessage={makeMessage} messages={currentChannel.messages} currentUser={props.currentUser} channel={currentChannel.channel}/>
            </Grid>   
          </Container>
        </main>
        <Modal
        open={newChannelOpen}
        onClose={handleNewChannelClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <ThemeProvider theme={loginTheme}>
            <NewChannel createNewChannel={createNewChannel}/> 
          </ThemeProvider>
      </Modal>

      <Modal
        open={profileOpen}
        onClose={handleProfileClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <ThemeProvider theme={loginTheme}>
            <EditProfile changeProfile={changeProfile}/> 
          </ThemeProvider>
      </Modal>
    </div>
  );
}

export default App