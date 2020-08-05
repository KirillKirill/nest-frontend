import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Register from "../../components/Register/Register"
import Login from "../../components/Login/Login"
import Profile from "../../components/Profile/Profile"
import Admin from "../../components/Admin/Admin"
import Users from "../../components/Users/Users"
import EditProfile from "../../components/EditProfile/EditProfile"
import PrivateEditRoute from "../../components/PrivateRoutes/PrivateEditRoute"
import PrivateAdminRoute from "../../components/PrivateRoutes/PrivateAdminRoute"
import PrivateProfileRoute from "../../components/PrivateRoutes/PrivateProfileRoute"

function AppRouter() {
  return (
    <Router>
      <Switch>
        <PrivateProfileRoute exact path="/" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <PrivateEditRoute path="/edit" component={EditProfile} />
        <PrivateAdminRoute path="/admin" component={Admin} />
      </Switch>
    </Router>
  )
}

export default AppRouter
