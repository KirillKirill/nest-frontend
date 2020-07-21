import React, { useState } from "react"
import Auth from "./components/Auth/Auth"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Users from "./components/Users/Users"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"))
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
        <Switch>
          {!userToken && (
            <Route
              exact
              path="/login"
              render={props => <Auth {...props} setUserToken={setUserToken} />}
            />
          )}
          <PrivateRoute isLoggedIn={!!userToken} path="/" component={Users} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
