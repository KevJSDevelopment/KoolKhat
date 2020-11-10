import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from "./App"
import Welcome from "./welcome"

const Runner = () => {

    const [token, setToken] = useState(false)

    useEffect(() => {

        setToken(!!localStorage.getItem("token") && localStorage.getItem("token") != "undefined")
        console.log(!!localStorage.getItem("token") && localStorage.getItem("token") != "undefined")

    }, [token])
    
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {token ? <App/> : <Welcome />}
                </Route>
            </Switch>
        </Router>
    )
}

export default Runner
