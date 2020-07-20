import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      1 > 0 ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Component {...props} />
      )
    }
  />
)

export default PrivateRoute
