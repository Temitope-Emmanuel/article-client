import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router-dom"
import {Container,Box,Typography,TextField,Button,Slide} from "@material-ui/core"
import {isAuthenticated} from "../auth/auth-helper"
import Navbar from "../core/Navbar"
import Tabs from "./materialTabs"


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
            <Container className={classes.root}>
                <Typography variant="h3" >
                    Write a New Article
                </Typography>
                <Tabs/>
            </Container>
        </>
    )
}

export default CreateArticle