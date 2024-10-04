import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import store from './store';
import { Provider } from "react-redux";
import { PrimeReactProvider } from 'primereact/api';
import FemaleAvatar from "../../client/src/assets/images/Avatar 1.jpg"
import MaleAvatar from "../../client/src/assets/images/Avatar 2.jpg"

const value = {
  zIndex: {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100,   // tooltip
      toast: 1200     // toast
  },
  autoZIndex: true,
};


ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>,
)
