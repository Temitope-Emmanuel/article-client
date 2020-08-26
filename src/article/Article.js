import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {readArticle} from "./api-article"
import AlertHOC from "../core/Consumer"

const useStyles = makeStyles(theme => ({
    root:{

    }
}))


const Article = ({context,...props}) => {
    const classes = useStyles()
    const [article,setArticle] = React.useState({})

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        readArticle(props.match.params.articleId).then(response => {
            if(response && response.error){
                context.handleAlert({type:"error",message:response.error})
            }else{
                context.handleAlert({type:"info",message:"Article successfully loaded"})
                setArticle(response.data)
            }
        })
    },[])

    return(
        <Box className={classes.root}>
            This is the read article page
        </Box>
    )
}


export default AlertHOC(Article)