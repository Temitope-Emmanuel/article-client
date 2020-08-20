import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Container} from "@material-ui/core"
import Navbar from "./Navbar"
import Footer from "./Footer"


const useStyles = makeStyles(theme => ({
  root:{}
}))



const Home = () => {
  const classes = useStyles()

  return (
    <>
      <Navbar/>
      <Container className={classes.root}>
      </Container>
      <Footer/>
    </>
  )
}

export default Home