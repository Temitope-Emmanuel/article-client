import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
// import {PrivatRoute} from "./auth/PrivateRoute"
import Home from "./core/Home"
import Login from "./auth/login"


const MainRouter = () => (
    <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route  component={() => <Redirect to="/" />} /> 
    </Switch>
)


export default MainRouter