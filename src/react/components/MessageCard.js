import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./MessageCard.css";
import { handleLike, handleUnlike } from "../../redux/likes";
import { connect } from "react-redux";
import { messagefeed } from "../../redux/messages";
import { login } from "../../redux/auth";
import Button from "@material-ui/core/Button";
import { Component } from "react";
import { deleteMessage } from "../../redux/deleteMessage";


class MessageCard extends Component {
  
  handleDelete = (event, id) => {
    this.props.deleteMessage(event, id);
  };

  render() {
    return (
      <React.Fragment>
        <div id="cardHolder">
          <Card
            raised="true"
            style={{
              backgroundColor: "#09440e",
              color: "white",
              width: "45%",
              marginBottom: "20px",
              height: "200px",
              position: "relative"
            }}
          >
            <CardContent>
              <div id="nameHolder">{this.props.username}</div>
              <div id="likeAndNumberHolder">
                {this.props.likes}

                <Button
                  style={{ backgroundColor: "white" }}
                  onClick={event => this.props.handleLike(event, this.props.id)}
                >
                  <img
                    id="likeimage"
                    src={process.env.PUBLIC_URL + "/images/militarymedal.png"}
                    alt="medal"
                  />
                </Button>
              </div>
             {console.log(this.props.likesarray)}
             {console.log(this.props.username)}
              <div id="dateAndTimeHolder">
                <span>{this.props.dateCreated}</span>
                <span>{this.props.timeCreated}</span>
              </div>
              <div id="messageHolder">{this.props.text}</div>
              {this.props.username === this.props.user && (
                <Button
                  style={{
                    backgroundColor: "white",
                    width: "25%",
                    height: "45px",
                    position: "absolute",
                    bottom: "5%",
                    right: "10px"
                  }}
                  onClick={event => this.handleDelete(event, this.props.id)}
                >
                  delete
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  state => ({
    result: state.messagefeed.result,
    loading: state.messagefeed.loading,
    error: state.messagefeed.error,
    user: state.auth.login.result.username
  }),
  { messagefeed, login, handleLike, handleUnlike, deleteMessage }
)(MessageCard);
