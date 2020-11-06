import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = (props) => {

  const cableURL = "ws://localhost:3000/cable"

  const [currentUser, setCurrentUser] = useState(null)
  const [allChannels, setAllChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({channel: {}, users: [], messages: []})
  const [currentMessage, setCurrentMessage] = useState({})
  // const openConnection = () => {
  //   return new WebSocket('wss://localhost:3000/cable')
  // }

  // socket.onopen = function(event) {
  //   console.log('WebSocket is connected.');
  //   const msg = {
  //       command: 'subscribe',
  //       identifier: JSON.stringify({
  //           id: chatRoomId,
  //           channel: 'ChatRoomChannel'
  //       }),
  //   };
  //   socket.send(JSON.stringify(msg));
  // };

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
      // debugger
    }
    return socket
  }

  useEffect(() => {

    //fetching channel in case we need the information... 
    //prob not going to be in final code ... 
    //prob fetch user and user will have their channels 
    fetch("http://localhost:3000/channels/1")
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setCurrentChannel({...currentChannel, channel: data})
    })
    
    //openning websocket
    const socket = openWebSocket(cableURL, "ChannelChannel")

    socket.onmessage = event => {
      const response = event.data
      const msg = JSON.parse(response)
      if(msg.type === "ping"){
        return;
      }
      else if (msg) {
        console.log(msg)
        // setCurrentMessage(msg.message)
        // let newMsgArr = currentChannel.messages
        // newMsgArr.push(msg.message.text)
        // setCurrentChannel({...currentChannel, messages: newMsgArr})
      }
      // console.log
    }

  },[])

  const makeMessage = () => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({message: "YOOOOOO"})
    })
  }

  return (
    <div>
      {/* {console.log(currentChannel)} */}
      <h1> Hello world! </h1>
      <button onClick={makeMessage}> Make Message </button>
    </div>
  );
}

export default withRouter(App);

