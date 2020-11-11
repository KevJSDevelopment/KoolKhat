import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from "./App"
import Welcome from "./welcome"

const Runner = () => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [currentUser, setCurrentUser] = useState(null)

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
          // console.log(data)
          localStorage.setItem("token", data.token)
          setCurrentUser(data.user)
          setToken(localStorage.getItem("token"))
        })
    }

    const changeToken = (change) => {
        setToken(change)
    }
    
    return (
        <Router>
            <Switch>
            {/* <Route exact path="/" component={() => <App setToken={changeToken} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/> */}
              <Route exact path="/" render={()=> !!token ? <Redirect to='/khat' /> : <Welcome setToken={changeToken} login={login} />} />
              <Route exact path="/khat" render={() => !!token ? <App setToken={changeToken} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Redirect to='/'/>} />

              {/* <Route exact path="/" render={() => this.state.searchedSchool ? <Redirect to='/listings'/> : <Body handleChange={this.handleChange} />} />
              <Route exact path="/listings" render={() => <ListingsPage searchedSchool={this.state.searchedSchool} listingsData={this.state.listingsData} />} /> */}
            </Switch>
        </Router>
    )
}

export default Runner
