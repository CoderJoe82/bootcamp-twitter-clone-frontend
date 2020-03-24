import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { connect } from "react-redux";
import { logout } from "../../redux";
import Button from "@material-ui/core/Button";

class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <React.Fragment>
      <div id="menu">
        <h1 id = "title">Coding for Veterans</h1>
        <img
              id="menuVetIcon"
              src={process.env.PUBLIC_URL + "/images/vetdayicon.png"}
              alt="veticon"
            />
        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Link id="messagefeed" to="/messagefeed/:username">Messages</Link>
            <Link to="/" onClick={this.handleLogout}>
              <Button style = {{backgroundColor: "white", color: "#09440e", fontWeight: "bold"}}>Logout</Button>
            </Link>
          </div>
        )}
      </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.logout.result,
    loading: state.auth.logout.loading,
    error: state.auth.logout.error
  }),
  { logout }
)(Menu);