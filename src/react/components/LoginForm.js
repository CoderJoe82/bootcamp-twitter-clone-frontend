import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import "./LoginForm.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { GoogleLogin } from "react-google-login";
import { google } from "../../redux/googlelogcheck"

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  responseGoogle = response => {
    console.log(response);
    const googleLogInData = {
      username:
        response.profileObj.givenName + response.profileObj.googleId.slice(-2),
      password: response.profileObj.googleId.slice(12)
    };
    console.log(googleLogInData);
    const googleStuff = {
      value: true,
      password: response.profileObj.googleId.slice(12)
    }
    this.props.google(googleStuff)
    this.props.login(googleLogInData);
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <Card id="login-div">
          <CardContent>
            <form id="login-form" onSubmit={this.handleLogin}>
              <h1>Login</h1>
              <div id="usernameSpot">
                <label htmlFor="username">Username</label>
                <br />
                <input
                  id="usernameSpot"
                  type="text"
                  name="username"
                  autoFocus
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div id="passwordSpot">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Button
                  style={{ marginBottom: "10px" }}
                  id="logbutton"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
                <div id = "gButtonHolder">
                  <GoogleLogin
                    clientId="793749246714-3cv23v5p4nmh712iatum1qo54n1h14td.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={response => this.responseGoogle(response)}
                    onFailure={response => this.responseGoogle(response)}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Card>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login, GoogleLogin, google }
)(LoginForm);
