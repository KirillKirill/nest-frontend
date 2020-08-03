import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import globalStore from "./stores"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

serviceWorker.unregister()
