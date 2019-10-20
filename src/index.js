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
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/about" component={About} />
          <Route path="/anonRecomm" component={AnonRecommendation} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path='*' component={() => "404 NOT FOUND, no sé que ande buscando pero aquí no está. Justo como el amor de ella por ti."}/>
        </Switch>
      </App>
    </Router>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
