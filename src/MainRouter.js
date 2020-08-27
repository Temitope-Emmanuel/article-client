import React from "react"
import {Route,Redirect} from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./core/Home"
import Login from "./auth/login"
import CreateArticle from "./article/createArticle"
import Snackbar from "./core/snackbar"
import AnimatedSwitch from "./core/AnimatedSwitch"
import Article from "./article/Article"
import Navbar from "./core/Navbar"

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
            <AnimatedSwitch>
                {/* <Route path="/login" component={Login} /> */}
                <PrivateRoute exact path="/article/create" component={CreateArticle} />
                <Route path="/article/:articleId" component={Article} />
                <Route path="/" component={Home} />
                <Route component={() => <Redirect to="/" />} /> 
            </AnimatedSwitch>
            </AlertContext.Provider>
    )
} 


export default MainRouter