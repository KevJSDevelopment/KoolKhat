import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from "./App"
import Welcome from "./welcome"

const Runner = () => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [currentUser, setCurrentUser] = useState(null)

    const login = (event) => {
        event.preventDefault()
        // debugger
        fetch(`https://stormy-savannah-56656.herokuapp.com/login`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({username: event.target[0].value, password: event.target[1].value})
        })
        .then(res => res.json())
        .then(async (data) => {
          if(data.auth){
            await setTimeout( () => {
              localStorage.setItem("token", data.token)
              setCurrentUser(data.user)
              setToken(localStorage.getItem("token"))
            }, 0)
          }
          else {
            alert(data.info)
          }
        })
    }

    const signup = (event) => {
        event.preventDefault()

        // if(event.target[0])
        const meta = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({username: event.target[0].value, password: event.target[1].value}) 
        }

        fetch(`https://stormy-savannah-56656.herokuapp.com/users`, meta)
        .then(res => res.json())
        .then(async (data) => {
          if(data.auth){
            await setTimeout( () => {
              localStorage.setItem("token", data.token)
              setCurrentUser(data.user)
              setToken(localStorage.getItem("token"))
            }, 0)
          }
          else {
            alert(data.info)
          }
        })

    }

    const changeToken = (change) => {
        setToken(change)
    }

    const updateCurrentUser = (user) => {
      setCurrentUser(user)
    }
    useEffect(() => {
      
    }, [currentUser])
    
    return (
        <Router>
            <Switch>
              <Route exact path="/KoolKhat/" render={()=> !!token ?  <Redirect to='/KoolKhat/khat' /> : <Welcome setToken={changeToken} login={login} signup={signup}/>} />
              <Route exact path="/KoolKhat/khat" render={() => !!token ? <App setToken={changeToken} currentUser={currentUser} setCurrentUser={updateCurrentUser} /> : <Redirect to='/KoolKhat/'/>} />
              <Redirect to="/KoolKhat/"/>
            </Switch>
        </Router>
    )
}

export default Runner
