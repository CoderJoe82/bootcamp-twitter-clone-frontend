import React from "react";
import { LoginForm } from "./components";
import { userIsNotAuthenticated } from "./HOCs";
import NewKidsOnTheBlock from "./components/registration/registration";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="mainContainer">
          <div id="leftSide">
            <img
              id="branches"
              src={process.env.PUBLIC_URL + "/images/Branches.png"}
              alt="militarybranches"
            />

            <p>Coding For Veterans</p>
            <LoginForm />
            <NewKidsOnTheBlock />
          </div>
          <div id="rightSide">
            <img
              id="thankyou"
              src={
                process.env.PUBLIC_URL + "/images/veterans-day-thank-you.jpg"
              }
              alt="veterans-day-thanks"
            />
            <img
              id="veticon"
              src={process.env.PUBLIC_URL + "/images/vetdayicon.png"}
              alt="veticon"
            />
            <h1 id = "missionTitle">Our Mission Statement:</h1>
            <p id="missionStatement">We know coming back into civilian life can be hard after serving your country. This can be even more true if you're older. Our mission is to bring coding to all veterans who are looking to learn a new skill or improve a learned one through volunteer mentors and peers to find a meaningful career. We're here to give veterans a fighting chance through coding.</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default userIsNotAuthenticated(Home);
