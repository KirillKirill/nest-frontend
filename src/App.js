import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateProfileRoute from "./components/PrivateRoutes/PrivateProfileRoute"
import "./App.css"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import PrivateAdminRoute from "./components/PrivateRoutes/PrivateAdminRoute"
import Admin from "./components/Admin/Admin"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateProfileRoute exact path="/" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateAdminRoute path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
