import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import './profile.css'
//import Avatar from "@material-ui/core/Avatar";
//import Button from "@material-ui/core/Button";
//import ExpansionPanel from '@material-ui/core/ExpansionPanel';
//import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
//import Typography from '@material-ui/core/Typography';
import {getuser} from "../redux";
import {connect} from "react-redux"
import UserCard from "./components/UserCard";


class Profile extends React.Component {
componentDidMount (){
  console.log(this.props.match.params.username)
  this.props.getuser(this.props.match.params.username);
};
  render() {
    // const {result } =this.props
    if(this.props.result === null){
      return(<div></div>)
    }
    return (
      <React.Fragment>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <div id = "mainHolder">
          <UserCard
            username = {this.props.result.user.username}
            displayName = {this.props.result.user.displayName}
            pictureLocation = {this.props.result.user.pictureLocation}
            bio = {this.props.result.user.about}
            />
            
          </div>
      </React.Fragment>
    );
  }
}

export default  connect (
  state =>({
    result: state.users.getuser.result, 
    loading: state.users.getuser.loading, 
    error: state.users.getuser.error
  }),
  {getuser})(userIsAuthenticated(Profile));
