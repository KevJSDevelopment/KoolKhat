import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = (props) => {

 const [currentUser, setCurrentUser] = useState(null)
 const [allChannels, setAllChannels] = useState([])
 const [currentChannel, setCurrentChannel] = useState({channel: {}, users: [], messages: []})

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

  useEffect(() => {

    //fetching channel in case we need the information... 
    //prob not going to be in final code ... 
    //prob fetch user and user will have their channels 
    fetch("http://localhost:3000/channels/2")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCurrentChannel({...currentChannel, channel: data})
      console.log(currentChannel)
    })
    

    //openning websocket
    const socket = new WebSocket('ws://localhost:3000/cable')
    
    socket.onopen = event => {
      console.log("rocket socket!!")

      // props.cableApp.cable.subscriptions.create({channel: "newChannel" })

      const msg = JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "ChannelChannel"
        })
      })

      socket.send(msg)
    }

    // socket.onmessage = event => {console.log(event.data)}

  },[])

  return (
    <h1> Hello world! </h1>
  );
}

export default withRouter(App);

