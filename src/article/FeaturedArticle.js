import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import Markdown from "markdown-to-jsx"
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

const FeaturedArticle = ({article,...props}) => {
    const classes = useStyles()
    return(
        <Grid item xs={12} lg={3} md={4} >
            <CardActionArea component="a" href={`/article/${article._id}`} >
                <Card className={classes.card} >
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" >
                                {article.title}
                            </Typography>
                            {/* <Typography variant="subtitle1" color="textSecondary">
                                {article.date.toLocaleString()}
                            </Typography> */}
                            <Typography variant="subtitle1" paragraph >
                                <Markdown>
                                {article.heading[2]}
                                </Markdown>
                            </Typography>
                            <Typography variant="subtitle1" paragraph >
                                <Markdown>
                                {article.heading[3]}
                                </Markdown>
                            </Typography>
                            <Typography variant="subtitle1" color="primary" >
                                Continue Reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown >
                        <CardMedia className={classes.CardMedia}
                         title={article.heading[1]} image={article.imageLink} />
                    </Hidden>
                </Card>               
            </CardActionArea>
        </Grid>
    )
}

// FeaturedArticle.PropTypes = {
//     article:PropTypes.arr.isRequired
// }

export default FeaturedArticle