import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import globalStore from "./stores"
import AppRouter from "./components/AppRouter/AppRouter"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <AppRouter>
        <App />
      </AppRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

serviceWorker.unregister()
