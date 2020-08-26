import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Box,Typography,Container,Avatar,Button} from "@material-ui/core"
import {green} from "@material-ui/core/colors"
import {readArticle} from "./api-article"
import AlertHOC from "../core/Consumer"
import BookmarksIcon from '@material-ui/icons/BookmarksOutlined';
import FacebookIcon from "@material-ui/icons/Facebook"
import LikeIcon from '@material-ui/icons/ThumbUpAltRounded';
import CommentIcon from '@material-ui/icons/BubbleChartRounded';
import TwitterIcon from "@material-ui/icons/Twitter"
import StarIcon from '@material-ui/icons/Star';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Markdown from "../config/Markdown"
import Chip from "../core/chip"
import Reward from "react-rewards"

const useStyles = makeStyles(theme => ({
    root:{
        padding:"0 2em",
        "& > *":{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            marginTop:"5em",
        }
    },
    profileContainer:{
        padding:".5em 2em",
        width:"90%",
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        height:"5em",
        cursor:"pointer",
        "&:hover":{
            "& > div:first-child":{
                // border:`4px dotted ${green["A700"]}`,
                // borderStyle:"dotted none dotted none",
                borderColor:`${green["A700"]} transparent ${green["A700"]} transparent`
            }
        },
        "& > div:first-child":{
            height:"3.7em",
            width:"3.7em",
            margin:"5px",
            border:`4px solid ${green["A200"]}`,
            transition:"all .5s ease-in-out"
        },
    },
    detailContainer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-end",
        justifyContent:"center",
        height:"5em",
        "& > div:first-child":{
            display:'flex',
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"-10px",
            "& > button":{
                padding:"5px",
                marginLeft:"15px"
            }
        },
        "& >  div:nth-child(2)":{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color:"rgba(0,0,0,.8)",
            "& *":{
                color:"rgba(0,0,0,.8)"
            }
        }
    },
    text:{
        fontSize:"2em",
        transform:"translateY(-30%)",
        margin:"2px"
    },
    socialContainer:{
        marginLeft:"auto",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        cursor:"pointer",
        "& > svg":{
            fontSize:"2em",
            margin:"0 .3em",
            color:"rgba(0,0,0,.7)",
            transition:"color .3s ease-in",
            "&:hover":{
                color:"black"
            }
        }
    },
    articleContainer:{
        margin:theme.spacing(2.5,0),
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        padding:"0 2em",
        "& > div:first-child":{
            width:"63em",
            marginBottom:"1.5em",
            "& > img":{
                width:"100%",
                borderRadius:".5em"
            }
        }
    },
    creditContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        "& > div:nth-child(1)":{
            width:"50%",
            display:"inline-block"
        },
    },
    actionContainer:{
        width:"50%",
        display:"inline-grid",
        gridTemplateColumns:"1fr 1fr",
        height:"100%",
        "& > div:first-child":{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            // flexDirection:"column",
            "& svg":{
                background:"rgba(0,0,0,.3)",
                fontSize:"2em",
                marginRight:".3em",
                padding:".3em",
                borderRadius:"50%",
                boxShadow:"0 0 6px 3px rgba(0,0,0,.8)",
                cursor:"pointer"
            }
        },
        "& > div:nth-child(2)":{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            "& svg":{
                background:"rgba(0,0,0,.3)",
                fontSize:"2em",
                marginRight:".3em",
                padding:".3em",
                borderRadius:"50%",
                boxShadow:"0 0 6px 3px rgba(0,0,0,.8)",
                cursor:"pointer"
            }
        },
        "& > div:nth-child(3)":{
            width:"200%",
            margin:"2em 0"
        }
    }
}))


const Article = ({context,match:{params:{articleId}},...props}) => {
    const classes = useStyles()
    const [article,setArticle] = React.useState({})
    let buttonRef = React.createRef()
    let commentRef = React.createRef()
    const showAnimation = () => {
        buttonRef.rewardMe()
        // buttonRef.punishMe()
    }
    const commentAnimation = () => {
        commentRef.rewardMe()
        // buttonRef.punishMe()
    }

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        readArticle(articleId).then(response => {
            if(response && response.error){
                context.handleAlert({type:"error",message:response.error})
            }else{
                console.log(response)
                context.handleAlert({type:"info",message:"Article successfully loaded"})
                setArticle(response)
            }
        })
        return function(){
            abortController.abort()
        }
    },[articleId])
    console.log(typeof article.body)
    return(
        <Box className={classes.root}>
            <Container >
                <Typography variant="h2" >
                    {article.title}                
                </Typography>
                <Box className={classes.profileContainer} >
                    <Avatar src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
                    <Box className={classes.detailContainer} >
                        <Box>
                            {article.author?.username} 
                            <Button variant="outlined" >Follow</Button>
                        </Box>
                        <Box >
                            {"Nov 8, 2019"}
                            <span className={classes.text} >
                                .
                            </span>
                            2 min read
                            <StarIcon/>
                        </Box>
                    </Box>
                    <Box className={classes.socialContainer}>
                        <BookmarksIcon/>
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <LinkedInIcon/>
                    </Box>
                </Box>
                <Box className={classes.articleContainer}>
                    <Box>
                        <img src={article.imageLink} />
                    </Box>
                    <Box>
                    <Markdown>
                        {article.body ? article.body : ""}
                    </Markdown>
                    </Box>
                </Box>
                {
                    article.title &&
                    <Box className={classes.creditContainer}>
                        <Box className={classes.chipContainer}>
                            <Chip/>
                        </Box>
                        <Box className={classes.actionContainer} >
                            <Box onClick={showAnimation} >
                                <Reward
                                    ref={(ref) => { buttonRef = ref }}
                                    type='confetti'
                                    >
                                        <LikeIcon/>
                                        <span>79 claps</span>
                                </Reward>
                            </Box>
                            <Box>
                                <Reward type="memphis"
                                    ref={ref => {commentRef = ref}}>
                                    <CommentIcon/>
                                    <span>2 response</span>
                                </Reward>
                            </Box>
                            <Box className={classes.socialContainer}>
                                <BookmarksIcon/>
                                <FacebookIcon/>
                                <TwitterIcon/>
                                <LinkedInIcon/>
                            </Box>
                        </Box>
                    </Box>
                }
            </Container>
        </Box>
    )
}


export default AlertHOC(Article)