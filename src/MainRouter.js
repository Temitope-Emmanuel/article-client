import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./core/Home"
import Login from "./auth/login"
import CreateArticle from "./article/createArticle"
import Snackbar from "./core/snackbar"
import AnimatedSwitch from "./core/AnimatedSwitch"

export const AlertContext = React.createContext({
    payload:{},
    open:false
})

const MainRouter = () =>{
    const [alert,setAlert] = React.useState({
        type:"",
        message:""
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
        <AlertContext.Provider value={{payload:alert,handleAlert:handleSnackbar,open:openSnackbar}} >
            <AlertContext.Consumer>
                {(context) => (
                    <Snackbar open={openSnackbar} payload={context.payload} />
                )}
            </AlertContext.Consumer>
            <AnimatedSwitch>
                <Route key={1} path="/login" component={Login} />
                <PrivateRoute key={2} exact path="/article/create" component={CreateArticle} />
                <Route key={3} path="/" component={Home} />
                <Route key={4} component={() => <Redirect to="/" />} /> 
            </AnimatedSwitch>
            </AlertContext.Provider>
    )
} 


export default MainRouter