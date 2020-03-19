import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import "./LoginForm.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";


class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
                <Button id="logbutton" type="submit" disabled={loading}>
                  Login
                </Button>
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
  { login }
)(LoginForm);
