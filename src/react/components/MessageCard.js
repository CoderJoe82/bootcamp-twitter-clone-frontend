import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const usedStyles = makeStyles({
    root: {maxWidth: 250,},
    title: {fontSize: 14,},

});
const MessageCard = (props)=> {
    const classes = usedStyles();
    return(
        <>
        <Card className = {classes.root} raised="true" >
            <Typography component = "div" style = {{ backgroundColor: '#cfe8fc', height: '10px', width: '400px' }} />
            <CardContent>
                <Typography variant= "h5" component="h2">
                    {props.username}
                </Typography>
                <Typography color= "textSecondary">
                    {props.text}
                    </Typography>
                </CardContent>    
        </Card>
        </>
    )

}
export default MessageCard;