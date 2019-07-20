import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom"
import InventoryPanel from './inventoryPanel';
import Route from "react-router-dom/Route"
import Login from './login'
import Register from './Register';
ReactDOM.render

(<BrowserRouter>
<Route  path="/" component={Login}/>
<Route path="/app" component={Register}/>
{/* <App /> */}
</BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
