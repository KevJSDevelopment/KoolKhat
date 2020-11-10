import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from "./App"
import Welcome from "./welcome"

const Runner = () => {
    return (
        <Router>
        <Switch>
            <Route path="/welcome" exact component={Welcome}/>
            <Route path="/" exact component={App}/>
        </Switch>
            
        </Router>
    )
}

export default Runner
