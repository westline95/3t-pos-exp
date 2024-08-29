import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import store from './store';
import { Provider } from "react-redux";
import FemaleAvatar from "../../client/src/assets/images/Avatar 1.jpg"
import MaleAvatar from "../../client/src/assets/images/Avatar 2.jpg"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
