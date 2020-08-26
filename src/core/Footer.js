import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Link} from "react-router-dom"
import {Box,Container, Typography} from "@material-ui/core"
import {NavImg2} from "../asset/index"

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:"black",
        minHeight:"60vh",
        textAlign:"center",
        "& h6":{
            marginTop:"revert",
            fontSize:"1em"
        }
    },
    container:{
        display:"flex",
        width:"100vw",
        justifyContent:"flex-start",
        alignItems:"baseline",
        flexDirection:"row",
        "& > div":{
            margin:"0 1%",
            "& > div":{
                display:"flex",
                justifyContent:"flex-start",
                width:"100%",
                alignItems:"center",
                margin:"2em .2em",
                "& a":{
                    margin:"0 .8em",
                    textDecoration:"none",
                    color:"white",
                    "p":{
                        fontSize:"1.3em",
                        whiteSpace:"nowrap"
                    }
                },
                "& > span":{
                    color:"white",
                    "& > a":{
                        color:"rgba(255,255,255,.6)"
                    }
                }
            }
        }
    },
    imageContainer:{
        height:"10em",
        width:"25%"
    }
}))

const Footer = () => {
    const classes = useStyles()

    return(
        <Box className={classes.root}>
            <Container className={classes.container}>
                    <Box className={classes.imageContainer}>
                        <img alt="footer" style={{width:"100%"}} src={NavImg2} />
                    </Box>
                <Box style={{width:"60%"}}>
                    <Box className={classes.startContainer}>
                        <Link to ="/">
                        <Typography variant="button">
                            Get Started
                        </Typography>
                        </Link>
                        <Link to ="/">
                        <Typography variant="button">
                            Subscribe
                        </Typography>
                        </Link>
                        <Typography variant="button">
                            Have an Account? <Link to="/" >Sign in</Link>
                        </Typography>
                    </Box>
                    <Box className={classes.aboutContainer}>
                        <Link to ="/">
                            <Typography variant="button">
                                About Campus Magazine
                            </Typography>
                        </Link>
                        <Link to ="/">
                            <Typography variant="button">
                                Write
                            </Typography>
                        </Link>
                        <Link to ="/">
                            <Typography variant="button">
                                Gift
                            </Typography>
                        </Link>
                        <Link to ="/">
                            <Typography variant="button">
                                Help
                            </Typography>
                        </Link>
                        <Link to ="/">
                            <Typography variant="button">
                                Press Contact
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Container>
                    <Typography style={{color:"white"}} variant="subtitle2">
                        © 2020 Temitope Emmanuel Ojo
                    </Typography>
        </Box>
    )
}

export default Footer