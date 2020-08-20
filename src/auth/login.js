import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Container} from "@material-ui/core"


const useStyles = makeStyles(theme => ({
    root:{}
}))

const Login = () => {
    const classes = useStyles()

    return(
        <Container>
            This is then login page
        </Container>
    )
}

export default Login