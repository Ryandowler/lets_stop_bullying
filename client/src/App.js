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
                    <Route path="/home" render={() =>
                        <Home />}
                    />
                    <Route path="/sections/:sectionid" render={(props) => <Section {...props} />}/>
                </Switch>
            </BrowserRouter>
        </div>
    );

  }
}

export default App;
