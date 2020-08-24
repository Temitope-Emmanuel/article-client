import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./core/Home"
import Login from "./auth/login"
import CreateArticle from "./article/createArticle"

export const AlertContext = React.createContext({
    payload:{},
    open:false
})

const MainRouter = () =>{
    const [alert,setAlert] = React.useState({
        type:"success",
        message:"Login Successful"
    })
    const [openSnackbar,setOpenSnackbar] = React.useState(false)
    
    const handleSnackbar = (payload) => {
        setOpenSnackbar(true)
        setAlert(payload)
        setTimeout(() => {
          setOpenSnackbar(false)
        },4000)
    }
    


    return(
        <Switch>
            <AlertContext.Provider value={{payload:alert,handleAlert:handleSnackbar,open:openSnackbar}} >
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/article/create" component={CreateArticle} />
                <Route path="/" component={Home} />
                <Route component={() => <Redirect to="/" />} /> 
            </AlertContext.Provider>
        </Switch>
    )
} 


export default MainRouter