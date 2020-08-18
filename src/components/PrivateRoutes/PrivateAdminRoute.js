import React from "react"
import jwtDecode from "jwt-decode"
import { Route, Redirect } from "react-router-dom"

const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      JSON.parse(localStorage.getItem("auth")).token &&
      jwtDecode(JSON.parse(localStorage.getItem("auth")).token)
        .role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
)

export default PrivateAdminRoute
