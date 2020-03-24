import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../../redux/registration/registration";
import "./registration.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { GoogleLogin } from "react-google-login";

class NewKidsOnTheBlock extends Component {
  state = {
    username: "",
    displayName: "",
    password: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handleLogin = event => {
    const data = {
      username: this.state.username,
      displayName: this.state.displayName,
      password: this.state.password
    };
    console.log(data);
    this.props.register(data);
  };
  responseGoogle = response => {
    console.log(response);
    const googleRegisterData = {
      username:
        response.profileObj.givenName + response.profileObj.googleId.slice(-2),
      displayName: response.profileObj.givenName,
      password: response.profileObj.googleId.slice(12)
    };
    this.props.register(googleRegisterData);
  };

  render() {
    return (
      <React.Fragment>
        <Card id="register-div">
          <CardContent>
            <div>
              <form id="signup-form" onSubmit={this.handleLogin}>
                <h1 id="regText">Register</h1>
                <div id="usernameSpot">
                  <label htmlFor="username">Username</label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    autoFocus
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div id="displayNameSpot">
                  <label htmlFor="displayName">Display Name</label>
                  <br />
                  <input
                    type="text"
                    name="displayName"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div id="passwordSpot">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </form>
              <br />
              <Button
                id="newuserbutton"
                type="submit"
                onClick={this.handleLogin}
                style={{ marginBottom: "10px" }}
              >
                Register
              </Button>
              <div id = "gRegisterHolder">
                <GoogleLogin
                  clientId="793749246714-3cv23v5p4nmh712iatum1qo54n1h14td.apps.googleusercontent.com"
                  buttonText="Sign Up"
                  onSuccess={response => this.responseGoogle(response)}
                  onFailure={response => this.responseGoogle(response)}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    red: state.registration.register.result,
    blue: state.registration.register.loading,
    green: state.registration.register.error
  }),
  { register }
)(NewKidsOnTheBlock);
