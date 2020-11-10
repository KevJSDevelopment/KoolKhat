import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from "./App"
import Welcome from "./welcome"

const Runner = () => {

    const [token, setToken] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const login = (event) => {
        event.preventDefault()
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
        setToken(true)
    }

    const changeToken = (change) => {
        setToken(change)
    }

    useEffect(() => {

    }, [])
    
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={()=> token ? <App setToken={changeToken} currentUser={currentUser} setCurrentUser={setCurrentUser} />  
                                                        : 
                                                        <Welcome setToken={changeToken} login={login} />} />
            </Switch>
        </Router>
    )
}

export default Runner
