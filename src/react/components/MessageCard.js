import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./MessageCard.css";
import { handleLike, handleUnlike } from "../../redux/likes"
import { connect } from "react-redux"
import {messagefeed} from "../../redux/messages"
import { login } from "../../redux/auth"


const usedStyles = makeStyles({
  root: { maxWidth: 250 },
  title: { fontSize: 14 }
});

const MessageCard = props => {
  const classes = usedStyles();
  return (
    <React.Fragment>
      <Card className={classes.root} raised="true">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "10px", width: "400px" }}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.username}
          </Typography>
          <Typography color="textSecondary">{props.text}</Typography>
          <img
            id="likeimage"
            src={process.env.PUBLIC_URL + "/images/militarymedal.png"}
            alt = "medal"
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default connect(
    state => ({
      result: state.messagefeed.result,
      loading: state.messagefeed.loading,
      error: state.messagefeed.error, 
      user:state.auth.login.result.username
    }),
    { messagefeed, login, handleLike, handleUnlike }
  )(MessageCard);
