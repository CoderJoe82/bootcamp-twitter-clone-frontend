import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Signup from "./Signup";
import MessageFeed from "./MessageFeed"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/signup" component ={Signup}/>
        <Route exact path="/messagefeed/:username" component={MessageFeed}/>
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
