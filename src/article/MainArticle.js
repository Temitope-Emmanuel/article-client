import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {Paper,Typography,Grid,Link} from "@material-ui/core"
import Markdown from "markdown-to-jsx"


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width:"100%",
        height:"60vh"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        }
    },
    markdownContainer:{
        marginRight:"20px",
        overflow:"hidden",
        width:"45em"
    }
}))

const defaultValue = {
    imageLink:"https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    // imageLink:"https://source.unsplash.com/random",
    title:"A new Beginning",
    _id:"23y606248682346823489",
    body:`  
    - Building UIs should be simpler, it still too slow and complex.
    Designers and developers should benefit from a more integrated experience.
    - Every now and then, we witness the appearance of a new React UI component library built from scratch ([UXPin](https://adele.uxpin.com/) keeps track of some of them).
    And every time we asked ourselves, "what could have we done differently to empower this library"?
    We believe that starting from scratch, while maximizing freedom, is incredibly inefficient.
    Most UI libraries need the same features but are implemented with a wide spectrum of accessibility, developer experience, and overall design quality.
    We won't rest until we successfully unify these efforts. It's a long term mission and will probably take years. The foundation will be the release of an un-styled version of our components.
    `
}

const MainArticle = ({post,article=defaultValue,...props}) => {
    const classes = useStyles();
    return(
        <Paper className={classes.mainFeaturedPost}
         style={{ backgroundImage: `url(${article.imageLink})` }}>
             {<img style={{display:"none"}} src={article.imageLink} alt={article.title} />}
             <div className={classes.overlay} />
             <Grid container >
                 <Grid item md={6}>
                     <div className={classes.mainFeaturedPostContent}>
                         <Typography component="h1" variant="h3" color="inherit" gutterBottom >
                             {article.title}
                         </Typography>
                        {/* <Typography variant="h5" color="inherit" paragraph > */}
                            <Markdown className={classes.markdownContainer}>
                                {defaultValue.body}
                            </Markdown>
                        {/* </Typography> */}
                        <Link variant="subtitle1" href={`/article/${article._id}`} >
                            Continue Reading...
                        </Link>
                     </div>
                 </Grid>
             </Grid>
        </Paper>
    )
}

MainArticle.propTypes = {
    article:PropTypes.object.isRequired
}

export default MainArticle