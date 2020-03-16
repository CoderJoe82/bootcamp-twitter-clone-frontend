import React from "react"
import {connect} from "react-redux"
import MessageCard from "./components/MessageCard"
import {messagefeed} from "../redux"
import { Menu } from "./components";



class MessageFeed extends React.Component {
    componentDidMount () {
        this.props.messagefeed();
    }
    render () {
        if(this.props.result === null){
            return(<div></div>)
        }
        return (
            <>
                <
                    Menu />
                <h2>Message Feed</h2>
                {this.props.result.map(message =>(
                    <MessageCard
                    username={message.username}
                    text={message.text}>

                    </MessageCard>
                ))}
                
            </>
        )
    }
}
export default connect(
    state => ({
        result: state.messages.messagefeed.result,
        loading: state.messages.messagefeed.loading,
        error: state.messages.messagefeed.error
    }),
    {messagefeed})(MessageFeed);
