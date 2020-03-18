import React, {Component} from "react";
import { Menu, CreateUsers} from "./components";
import { userIsNotAuthenticated} from "./HOCs";

class Signup extends Component{
    render(){
        return (
        
            <>
            <Menu />
            <h2> Sign up today!!!
            </h2>
            <CreateUsers />
            </>
        )
    }
}

export default userIsNotAuthenticated(Signup)