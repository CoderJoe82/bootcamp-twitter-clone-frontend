import React, {Fragment} from "react"
import {connect} from "react-redux"
import MessageCard from "./components/MessageCard"
import {messagefeed} from "../redux/messages"
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs/";
import PostMessages from "./components/PostMessages"




class MessageFeed extends React.Component {
    componentDidMount () {
        this.props.messagefeed();
    }
    render () {
        if(this.props.result === null){
            return(<Fragment><Menu isAuthenticated={this.props.isAuthenticated} /><div><h1>WHAT UP BITCHES</h1></div></Fragment>)
        }
        return (
            <>
                <Menu isAuthenticated={this.props.isAuthenticated}/>
                <h2>Message Feed</h2>
                <PostMessages></PostMessages>
                {this.props.result.map(message =>(
                    
                    <MessageCard
                    username={message.username}
                    text={message.text}
                    id = {message.id}
                    likes = {message.likes.length}
                      dateCreated = {message.createdAt.split("").splice(0, 10).join("")}
                    timeCreated = {message.createdAt.split("").splice(11, 5).join("")}

                    >
                    </MessageCard>
                ))}
                
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
    {messagefeed})(userIsAuthenticated(MessageFeed));
