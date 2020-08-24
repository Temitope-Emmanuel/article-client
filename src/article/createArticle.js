import React from "react"
import Markdown from "markdown-to-jsx"
import {makeStyles} from "@material-ui/core/styles"
import {Container,Box,Typography,TextField,Button,Slide} from "@material-ui/core"
import {isAuthenticated} from "../auth/auth-helper"
import Navbar from "../core/Navbar"
import Tabs from "./materialTabs"
import useInputState from "../hook/inputState"

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
    return(
        <>
            <Navbar/>
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