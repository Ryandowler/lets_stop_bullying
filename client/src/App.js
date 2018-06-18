import React, { Component } from 'react';
import './App.css';
import Language from './components/Language';
import Home from './components/Home';
import Page from './components/Page';
import Section from './components/Section';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { Redirect, BrowserRouter, Switch } from 'react-router-dom';


class App extends Component {

  render() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() =>
                        <Language  />}
                    />
                    <Route exact path="/home" render={() =>
                        <Home />}
                    />
                    <Route exact path="/sections/:sectionid" render={(props) => <Section {...props} />}/>
                    <Route expact path="/sections/:sectionid/:pageid" render={(props) => <Page {...props} />}/>
                </Switch>
            </BrowserRouter>
        </div>
    );

  }
}

export default App;
