import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
  export default function UserCard(props) {
    const classes = useStyles();
    let hasImage = false;
    //let hasBio = false;
    let defaultBio = "No about info setup"
    if (props.pictureLocation !== null)  hasImage=true;
    // if (props.about !== "") {
    //   defaultBio = props.about
    // };
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="User Image"
            height="260"
            image={hasImage ? `${props.pictureLocation }` : "https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png"}
            title="Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.displayName} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {defaultBio}
            </Typography>
          </CardContent>  
          </CardActionArea>
          <CardActions>
        <Button size="small" color="primary" >
          Edit Profile
        </Button>
        <Button size="small" color="primary" >
          Delete User
        </Button>
      </CardActions>
          </Card>
  );
}









