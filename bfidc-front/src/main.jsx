import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./redux/store/store.js";
import './assets/css/style.css';
import './assets/css/modal.css';
import './assets/css/dropdownmenu.css';
import './assets/css/progress.css';
import './assets/css/bootstrap.css';
import './assets/css/scrollbar.css';
import './assets/css/sidebar.css';
//import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>,
)
