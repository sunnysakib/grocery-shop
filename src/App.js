import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './component/Home/Home';
import Orders from './component/Orders/Orders';
import Admin from './component/Admin/Admin';
import Deals from './component/Deals/Deals';
import Login from './component/Login/Login';
import NoMatch from './component/NoMatch/NoMatch';
import Logo from './icons/logo.png';
import PrivateRoute from './component/Login/PrivateRoute';

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
      <div className="container">
        <nav className=" navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
              <Link class="navbar-brand" to="/">
              <img src={Logo} alt="" height="24"></img>
              </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
            <div className="nav-bar collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/orders">Orders</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link"  to="/admin">Admin</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/deals">Deals</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
          
        </nav>
      </div>
        <Switch>
          <PrivateRoute path="/orders">
            <Orders/>
          </PrivateRoute>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/deals">
            <Deals/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
