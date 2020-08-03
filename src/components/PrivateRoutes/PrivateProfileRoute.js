import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateProfileRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      JSON.parse(localStorage.getItem("auth")).token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
)

export default PrivateProfileRoute
