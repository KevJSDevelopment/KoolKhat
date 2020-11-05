import './App.css';
import React, { useState } from 'react'

const App = (props) => {

 const [currentUser, setCurrentUser] = useState(null)
 const [allChannels, setAllChannels] = useState([])
 const [currentChannel, setCurrentChannel] = useState({channel: {}, users: [], messages: []})

  // const openConnection = () => {
  //   return new WebSocket('wss://localhost:3000/cable')
  // }

  return (
    <h1> Hello world! </h1>
  );
}

export default App;
