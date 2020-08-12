import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import {PrivatRoute} from "./auth/PrivateRoute"
import Home from "./core/Home"


const MainRouter = () => (
    <Switch>
        <Route path="/" component={Home} />
    </Switch>
)


export default MainRouter