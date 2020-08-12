import React,{Component} from 'react'
import {Route,Redirect} from "react-router-dom"


export default ({component:Component,...rest}) => (
    <Route {...rest} render={props => (
        true ? (
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