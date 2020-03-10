import React, {Component}from "react";
//import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login, signup } from "../../redux";
//import {Link, Redirect} from "react-router-dom"

class CreateUsers extends Component{
    state ={
        userName: "",
        displayName: "",
        password: ""

    };
  handleSignUp = event =>{
      event.preventDefault();
      this.props.signup(this.state);
  };
  handleChange = event => {
      this.setState({ [event.target.name]: event.target.value});
  };
  render(){
      //const {loading,error}=this.props;

      return (
          <React.Fragment>
              <form id = "createuser" onSubmit = {this.handleSignUp}>
                  <label htmlFor = "username ">Username </label>
                  <input
            type="text"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          />
          <label htmlFor = "displayname">Display Name </label>
          <input
            type="text"
            name = "displayName"
            required
            onChange={this.handleChange}
            />
            <button type="submit">
            Create User
          </button>
              </form>
              </React.Fragment>
      )
  }
}
export default connect(
    state=> ({
        result: state.users.signup.result,
        loading: state.users.signup.loading,
        error: state.users.signup.error
    }),
    { signup, login}
)(CreateUsers);