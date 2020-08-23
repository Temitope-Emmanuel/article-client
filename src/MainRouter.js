import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./core/Home"
import Login from "./auth/login"
import CreateArticle from "./article/createArticle"


const MainRouter = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/article/create" component={CreateArticle} />
        <Route path="/" component={Home} />
        {/* <Route component={() => <Redirect to="/" />} />  */}
    </Switch>
)


export default MainRouter