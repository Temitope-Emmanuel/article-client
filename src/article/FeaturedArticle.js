import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Markdown from "../config/Markdown"
import {deepPurple} from "@material-ui/core/colors"
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  root:{
    borderRadius: "13px",
    background: deepPurple[100],
    boxShadow:  `-35px -35px 70px #987d9f, 
                 35px 35px 70px #ffffff`
  },
  media: {
    height: 200,
  },
});

const FeaturedArticle = ({article,...props}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.imageLink  || "" }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Markdown>
                {article.heading[1]}
            </Markdown>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">
          Share
        </Button>
        <Button color="primary">
            <Link to={`/article/${article._id}`} >
                Learn More
            </Link>
        </Button>
      </CardActions>
    </Card>
  );
}


export default FeaturedArticle