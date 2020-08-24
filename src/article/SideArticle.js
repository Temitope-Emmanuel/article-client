import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {Grid,Paper,Typography,Link} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    sidebarBox:{
        padding:theme.spacing(2),
        backgroundColor:theme.palette.grey[200]
    },
    sidebarSection:{
        marginTop:theme.spacing(3)
    }
}))

const SideArticle = ({archives,description,social,title,...props}) => {
    const classes = useStyles()

    return(
        <Grid item xs={12} md={4} >
            <Paper elevation={0} className={classes.sidebarBox} >
                <Typography variant="h6" gutterBottom >
                    {title}
                </Typography>
                <Typography>{description}</Typography>
            </Paper>
            <Typography variant="h6" gutterBottom className={classes.sidebarSection} >
                Archives
            </Typography>
            {archives.map((i) => (
                <Link display="block" variant="body1" href={i.url} key={i.title}>
                    {i.title}
                </Link>
            ))}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection} >
                Social
            </Typography>
            {social.map(network => (
                <Link display="block" variant="body1" href="#" key={network}>
                    <Grid container direction="row" spacing={1} alignItems="center" >
                        <Grid item >
                            <network.icon/>
                        </Grid>
                        <Grid item >
                            {network.name}
                        </Grid>
                    </Grid>
                </Link>
            ))}
        </Grid>
    )
}

SideArticle.propTypes = {
    archive:PropTypes.array,
    description:PropTypes.string,
    social:PropTypes.array,
    title:PropTypes.string
}


export default SideArticle