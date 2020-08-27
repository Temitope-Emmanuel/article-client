import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Box,Paper,Typography,Container,Avatar,Button} from "@material-ui/core"
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
import Wrapper from "../core/Wrapper"
import Navbar from "../core/Navbar"
import {AlertContext} from "../MainRouter"
import Snackbar from "../core/snackbar"

const useStyles = makeStyles(theme => ({
    root:{
        padding:"0 2em",
        marginBottom:"5em",
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
        },
        "& > div:nth-child(2)":{
            backgroundColor:"rgba(0, 0, 0, 0.05)",
            padding:"17px 10px",
            bordeRadius: ".5em"
            }
    },
    creditContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        "& > div:nth-child(1)":{
            width:"70%",
            display:"inline-block"
        },
    },
    actionContainer:{
        display:"inline-grid",
        gridTemplateColumns:"1fr 1fr",
        height:"100%",
        marginTop: "2.5em",
        "& > div:nth-child(3)":{
            width:"200%",
            margin:"2em 0"
        }
    },
    action:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        "& svg":{
            background:"rgba(0,0,0,.3)",
            fontSize:"1.5em",
            marginRight:".3em",
            padding:".3em",
            borderRadius:"50%",
            boxShadow:"0 0 6px 3px rgba(0,0,0,.8)",
            cursor:"pointer"
        },
        "& > span":{
            fontSize: "1.3em",
            marginLeft: ".7em",
            fontWeight: 600
        }
    },
    afterBodyContainer:{
        margin:"0 2.5em",
        padding:"0 1em",
    },
    userContainer:{
        border:"1px rgba(0,0,0,.2)",
        borderStyle:"solid none",
        marginBottom:"1em",
        padding:".5em"
    },
    userHolder:{
        display:"flex",
        flexDirection:"row",
        alignitems:"center",
        "& > div":{
            display:"block",
            padding:".5em"
        },
        "& > div:first-child":{
            height:"5em",
            width:"5em",
            marginRight:".5em"
        },
        "& > div:nth-child(2)":{
            display:"flex",
            flexDirection:"column",
            "& span:nth-child(1)":{
                // color:"rgba(0,0,0,.6)",
                opacity:".9",
                fontWeight:"600",
                letterSpacing:".05em",
                fontSize:"1.1em",
                marginBottom:"5px"
            },
            "& span:nth-child(2)":{
                fontSize:"1.3em",
                fontWeight:"600",
                marginBottom:"15px"
            },
            "& span:nth-child(3)":{
                width:"75%",
                fontSize:"1.7em",
                opacity:".7"
            }
        },
        "& > button":{
            height:"fit-content",
            alignSelf:"center",
            padding:".5em 2.5em"
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
    const description = `A Software Engineer turned writer. Udacity Full-stack Nanodegree Grad. Contributor to The Startup, Level Up Coding & Codeburst.io.`
    return(
        <>
        <Navbar/>
            <AlertContext.Consumer>
                {(context) => (
                    <Snackbar open={context.open} payload={context.payload} />
                )}
            </AlertContext.Consumer>
            
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
                    <Paper elevation={3} className={classes.afterBodyContainer}>
                    <Box className={classes.creditContainer}>
                        <Box className={classes.chipContainer}>
                            <Chip/>
                        </Box>
                        <Box className={classes.actionContainer} >
                            <Box onClick={showAnimation} >
                                <Reward type='confetti'
                                    ref={(ref) => { buttonRef = ref }}>
                                        <Box className={classes.action}>
                                            <LikeIcon/>
                                            <span >79 claps</span>
                                        </Box>
                                </Reward>
                            </Box>
                            <Box onClick={commentAnimation} >
                                <Reward type="confetti"
                                    ref={ref => {commentRef = ref}}>
                                    <Box className={classes.action}>
                                        <CommentIcon/>
                                        <span>2 response</span>
                                    </Box>
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
                    <Box className={classes.userContainer}>
                        <Box className={classes.userHolder} >
                            <Avatar variant="square" src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
                            <Box>
                                <span>WRITTEN BY</span>
                                <span>{article.author.username}</span>
                                <span>{article.author.description || description }</span>
                            </Box>
                            <Button variant="outlined" >
                                Follow
                            </Button>
                        </Box>
                    </Box>
                    </Paper>
                }
            </Container>
        </Box>
        </>
    )
}


export default Wrapper(AlertHOC(Article))