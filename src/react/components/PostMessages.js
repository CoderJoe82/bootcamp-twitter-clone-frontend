import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { newmessages } from '../../redux/messages';
class PostMessages extends React.Component {
    state = {text: ""}
    handleCreate = events => {
   console.log(`state is ${JSON.stringify(this.state)}`)
        this.props.newmessages(this.state);
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    render(){
        const classes = makeStyles({
            root: {maxWidth: 600, maxHeight: 30,
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 12,
            },
        });
        const {error} = this.props;
        return(
            <>
            <Card className ={classes.root} variant="outlined">
            <Typography component="div" style={{ backgroundColor: '#CFE8FC', height: '30px', width: '600px' }} >
                Post Message </Typography>
                <CardContent>
                    <form className={classes.root} autoComplete="off" name="newMessageForm">
                        <TextField  id ="messageText" name="text" label="New Message" placeholder={this.state.text} variant="outlined" onChange={this.handleChange}/>
                        </form>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleCreate}
                        >
                            Post Message
                        </Button>
                    {error && <p style={{ color: "red" }}>{error.message}</p>}
                </CardContent>
            </Card>
        </>
        )
    }
}
export default connect(
    state => ({
      result: state.messagefeed.messagefeed.result,
      loading: state.messagefeed.messagefeed.loading,
      error: state.messagefeed.messagefeed.error
    }),
    { newmessages }
  )(PostMessages);