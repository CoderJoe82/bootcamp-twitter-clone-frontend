import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import UpdateUsers from "./UpdateUsers";
import "./UserCard.css";
import Modal from "@material-ui/core/Modal"
import { newProfilePhoto } from "../../redux/newProfilePhoto"
import { connect } from "react-redux"
import { domain } from "../../redux/helpers"

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 345,
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: '2',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortes
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
// }));


class UserCard extends React.Component {
state = {
  expanded: false,
  photomodal: false,
  file: "",
}


handleExpandClick = () => {
  const newState = !this.state.expanded
    this.setState({expanded: newState})
  };
handleToggleModal = () => {
  const newState = !this.state.photomodal
    this.setState({photomodal: newState})
  }
handleGetPhoto = (event) => {
  const newState = event.target.files[0]
  this.setState({file: newState})
}
handleUploadPhoto = (event) => {
  const data = new FormData()
  data.append("picture",this.state.file)
  console.log(this.state)
  console.log(data)
  this.props.newProfilePhoto(event, data)
  this.handleToggleModal()
}
    render() {
    return (
      <Card id = "userCardSizer">
        <CardActionArea>
          {this.props.pictureLocation === null && 
          <CardMedia
            component="img"
            alt="User Image"
            height="260"
            image="https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png"
            title="Profile Picture"
          />}

{this.props.pictureLocation !== null && 
          <CardMedia
            component="img"
            alt="User Image"
            height="260"
            image={domain + this.props.pictureLocation}
            title="Profile Picture"
          />}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.displayName} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              
            </Typography>
          </CardContent>  
          </CardActionArea>
          <CardActions>

          Edit Profile<IconButton
          // className={clsx(classes.expand, {
          //   [classes.expandOpen]: expanded,
          // })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Button size = "small" color ="primary"
        >
          Delete User
        </Button>
        <Button onClick = {this.handleToggleModal}>
            Upload Photo
          </Button>
        <Modal style = {{backgroundColor: "white"}}open = {this.state.photomodal}>
          <div>
          <Button onClick = {this.handleUploadPhoto}>
            Upload Photo
            </Button>
            
          <form>
            <input type = "file" name = "photo" onChange = {this.handleGetPhoto}>
            </input>
            </form>
            <Button onClick = {this.handleToggleModal}>    
              Cancel
              </Button>
            </div>
            
          </Modal>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <UpdateUsers 
          username = {this.props.username}
          displayName = {this.props.displayName}
          about = {this.props.bio}
          password = {this.props.password}
          googlePassword = {this.props.googlePassword}
        />
      </CardContent>
    </Collapse>
          </Card>
  );
            
}
}

export default connect(null, {newProfilePhoto})(UserCard)








