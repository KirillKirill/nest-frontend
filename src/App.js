import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Users from "./components/Users/Users"
import Auth from "./components/Auth/Auth"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Users} />
          <Route path="/login" component={Auth} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
