import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch   } from 'react-router-dom';

import './index.css';
import App from './App';
import About from "./containers/anonUsers/About/About";
import AnonRecommendation from "./containers/anonUsers/AnonRecommendation/AnonRecommendation";
import FrontPage from "./containers/anonUsers/FrontPage/FrontPage";
import Login from "./containers/anonUsers/Login/Login";
import Signup from "./containers/anonUsers/Signup/Signup";
import Home from "./containers/loggedUsers/Home/Home";
import Profile from "./containers/loggedUsers/Profile/Profile";
import RequiresToken from "./components/RequiresToken/RequiresToken";
import NotFound from "./components/NotFound/NotFound";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/about" component={About} />
        <Route path="/anonRecomm" component={AnonRecommendation} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home"><RequiresToken><Home /></RequiresToken></Route>
        <Route path="/profile"><RequiresToken><Profile /></RequiresToken></Route>
        <Route path='*' component={NotFound}/>
      </Switch>
    </App>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
