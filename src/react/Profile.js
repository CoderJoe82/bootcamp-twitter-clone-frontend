import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import "./profile.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <div id="mainHolder">
          <div id="avatarButton">
            <Avatar
              style={{ width: "150px", height: "150px" }}
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/582982048744280064/ii5AYsnO.jpg"
            />
            <Button style={{ marginTop: "5px" }}>Edit Image</Button>
          </div>
        </div>
        <div id="expansionDiv">
          <ExpansionPanel style={{ marginBottom: "5%", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/aboutMeBanner.jpg"})`, backgroundSize: "cover" }}>
            <ExpansionPanelSummary style = {{height: "125px"}}/>
            <ExpansionPanelDetails style = {{height: "100px"}}>
            <Button style={{position: "absolute", backgroundColor: "white", top: "13%", left: "8%"}}>Edit</Button>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
                <br />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel style = {{marginBottom: "5%", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/middleBanner.jpg"})`, backgroundSize: "cover"}}>
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
          <ExpansionPanel style={{ marginBottom: "5%", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/bottomBanner.jpg"})`, backgroundRepeat: "cover", backgroundSize: "100%"    }}>
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
      </React.Fragment>
    );
  }
}

export default userIsAuthenticated(Profile);
