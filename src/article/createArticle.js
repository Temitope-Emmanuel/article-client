import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router-dom"
import {Container,Typography} from "@material-ui/core"
import {isAuthenticated} from "../auth/auth-helper"
import Tabs from "./materialTabs"
import Snackbar from "../core/snackbar"
import Navbar from '../core/Navbar'
import {AlertContext} from "../MainRouter"
import Wrapper from "../core/Wrapper"


const useStyles = makeStyles(theme => ({
    root:{
        marginTop:"2em",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    }
}))

const CreateArticle = () => {
    const classes = useStyles()
    const jwt = isAuthenticated()
    if(!jwt){
        return <Redirect to="" />
    }
    return(
        <>
            <Navbar/>
            <AlertContext.Consumer>
                {(context) => (
                    <Snackbar open={context.open} payload={context.payload} />
                )}
            </AlertContext.Consumer>
            <Container className={classes.root}>
                <Typography variant="h3" >
                    Write a New Article
                </Typography>
                <Tabs/>
            </Container>
        </>
    )
}

export default Wrapper(CreateArticle)