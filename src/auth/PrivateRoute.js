import React,{Component} from 'react'
import {Route,Redirect} from "react-router-dom"
import {isAuthenticated} from "./auth-helper"


export default ({component:Component,...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ):(
            <Redirect to={{
                pathname:'/signin',
                state:{from:props.location}
            }}
             />
        )
    )} />
)