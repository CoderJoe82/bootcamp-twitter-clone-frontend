import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {updateuser} from "../../redux"


  class UpdateUsers extends React.Component {
      state= {
          password: "",
          displayName: "",
          about: ""
      }
      handleSubmit = event => {
          this.props.updateuser(this.state)
      }
      handleChange = event => {
          this.setState({ [event.target.name]: event.target.value })
      }
      render (){

    const classes = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
    
    return (
      <Card className={classes.root}>
        <CardActionArea>
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                <form id= "update-user" onSubmit = {this.handleSubmit}>
                    <TextField required id = "displayName" label = "Display Name" variant= "outlined" name = "displayName" defaultValue={this.props.displayName} onChange ={this.handleChange}/>
                    <TextField id = "aboutInfo" label = "About me " variant = "outlined" name = "about" defaultValue = {this.props.about} onChange ={this.handleChange}/>
                    <TextField id = "password" label = "password" name = "password" variant = "outlined" onChange ={this.handleChange}/>
                </form>
            </Typography>
            
          </CardContent>  
          </CardActionArea>
          <CardActions>
              <Button size = "large" color = "primary" onClick = {this.handleSubmit}>
                  Update Profile
              </Button>
        
      </CardActions>
          </Card>
  );
}
  }
  export default connect (
      state => ({
          result: state.users.updateuser.result,
          loading: state.users.updateuser.loading,
          error: state.users.updateuser.error
      }),
      { updateuser }) (UpdateUsers)
  