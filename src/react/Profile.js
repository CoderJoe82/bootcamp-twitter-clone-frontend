import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import "./profile.css";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import './profile.css'
import {getuser} from "../redux";
import {connect} from "react-redux"
import UserCard from "./components/UserCard";
import GetUserList from "./components/GetUserList";

import { google } from "../redux/googlelogcheck"


class Profile extends React.Component {
componentDidMount (){
  console.log(this.props.match.params.username)
  this.props.getuser(this.props.match.params.username);
};

handleDeleteUser = () => {
  this.props.deleteuser();
}
  render() {
    if(this.props.result === null){
      return(<div></div>)
    }
    return (
      <React.Fragment>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <div id="expansionDiv">
          <ExpansionPanel style={{ marginBottom: "5%", color: "white", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/aboutMeBanner.jpg"})`, backgroundSize: "cover" }}>
            <ExpansionPanelSummary style = {{height: "125px"}}/>
            <ExpansionPanelDetails style = {{height: "100px"}}>
              <Typography>
                <span>{this.props.result.user.about}</span>
                <br />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel style = {{marginBottom: "5%", color: "white", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/middleBanner.jpg"})`, backgroundSize: "cover"}}>
          <ExpansionPanelSummary style = {{height: "125px"}}/>
            <ExpansionPanelDetails style = {{height: "100px"}}>
          <Button style={{position: "absolute", backgroundColor: "white", top: "13%", left: "8%"}}>Edit</Button>

              <Typography style = {{position: "relative"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
                <br />
                
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel style={{ marginBottom: "5%", color: "white", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/bottomBanner.jpg"})`, backgroundRepeat: "cover", backgroundSize: "100%"    }}>
          <ExpansionPanelSummary style = {{height: "125px"}}/>
            <ExpansionPanelDetails style = {{height: "100px"}}>
            <Button style={{position: "absolute", backgroundColor: "white", top: "11%", right: "8%"}}>Edit</Button>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
                <br />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div id = "mainHolder">
          <UserCard
            username = {this.props.result.user.username}
            displayName = {this.props.result.user.displayName}
            pictureLocation = {this.props.result.user.pictureLocation}
            bio = {this.props.result.user.about}
            googlePassword = {this.props.google}
            />
            <GetUserList/>
            
          </div>
      </React.Fragment>
    );
  }
}

export default  connect (
  state =>({
    result: state.users.getuser.result, 
    loading: state.users.getuser.loading, 
    error: state.users.getuser.error,
    google: state.googlecheck.google.result
  }),
  {getuser, google})(userIsAuthenticated(Profile));
   
  
  
