import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {
    Typography,Grid,Card,
    CardActionArea,CardContent,
    CardMedia,Hidden} from "@material-ui/core"


const useStyles = makeStyles(theme => ({
    card:{
        display:'flex'
    },
    cardDetails:{
        flex:1
    },
    CardMedia:{
        width:160
    }
}))

const FeaturedArticle = ({post,...props}) => {
    const classes = useStyles()

    return(
        <Grid item xs={12} lg={3} md={4} >
            <CardActionArea component="a" href="/" >
                <Card className={classes.card} >
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" >
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph >
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" >
                                Continue Reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown >
                        <CardMedia className={classes.CardMedia}
                         title={post.imageTitle} image={post.image} />
                    </Hidden>
                </Card>               
            </CardActionArea>
        </Grid>
    )
}


export default FeaturedArticle