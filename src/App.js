import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Users from "./components/Users/Users"
import Auth from "./components/Auth/Auth"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
        <Switch>
          <PrivateRoute exact path="/" component={Users} />
          <Route path="/login" component={Auth} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
