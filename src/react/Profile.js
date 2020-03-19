import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import './profile.css'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';


class Profile extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <div id = "mainHolder">
          <div id = "avatarButton">
            <Avatar style = {{width: "150px", height: "150px"}} alt="Remy Sharp" src="https://pbs.twimg.com/profile_images/582982048744280064/ii5AYsnO.jpg" />
            <Button style = {{marginTop: '5px'}}>Edit Image</Button>
          </div>
        </div>
        <div id = "expansionDiv">
        <ExpansionPanel>
          <ExpansionPanelSummary>
            About Me:
            
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.<br/>
            <Button style = {{marginTop: "15px"}}>
              Edit
              </Button>
          </Typography>
        </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
          <ExpansionPanelSummary>
            Languages Known:
            
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.<br/>
            <Button style = {{marginTop: "15px"}}>
              Edit
              </Button>
          </Typography>
        </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
          <ExpansionPanelSummary>
            Languages I want to know:
            
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.<br/>
            <Button style = {{marginTop: "15px"}}>
              Edit
              </Button>
          </Typography>
        </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>
      </React.Fragment>
    );
  }
}

export default userIsAuthenticated(Profile);
