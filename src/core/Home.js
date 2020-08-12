import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:"whitesmoke",
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        height:"100vh",
    },
    bodyContainer:{
        width:"60vw",
        backgroundColor:"white",
        height:"400px",
        flexDirection:"column",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        overflowY:"auto",
        position:"relative",
        overflowX:"hidden"
    },
    container:{
        backgroundColor:"white",
        margin:".5em 0",
        height:"30%",
        width:"100%",
        alignItems:"center",
        textAlign:"center",
        border:"1px solid black"
    },
    reloadContainer:{
        position:"fixed",
        bottom:0,
        backgroundColor:"red",
        height:"25%",
        width:"100%",
    }
}))

const Home = ( ) => {
    const classes = useStyles()
    const[post,setPost] = React.useState([])
    const loader = React.useRef(null)
    const [ check,setCheck] = React.useState(false)
    const [cancelFetch,setCancelFetch] = React.useState(false)
    
    const callFetch = (idx) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${idx}`)
        .then(response => response.json())
        .catch(err => console.log(err))
    }

    const handleObserver = (entity) => {
        const target = entity[0]
        if(target.isIntersecting){
            if(post.length + 10 < 100){
                return setCheck(curSt => !curSt);
            }else{
                setCancelFetch(true)
            }
        }
    }

    React.useEffect(() => {
        const createPost  = async () => {
            let newArr = [];
            for(var i = 1;i < 10;i++){
                newArr.push(callFetch(i+post.length))
            }
            const p = await Promise.all(newArr)
            console.log(p)
            const newPost = post.concat(p)
            setPost(newPost)
            if(post.length >= 99 ){
                setCancelFetch(true)
            }
        }
        createPost()
    },[check])

    React.useEffect(() => {
        if(post.length >= 99){
            setCancelFetch(true)
        }
    },[post])

    React.useEffect(() => {
        const options = {
             root:null,
             rootMargin:"20px",
             threshold:0.40
         }
        const observer = new IntersectionObserver(handleObserver,options)
        if(loader.current){
             observer.observe(loader.current)
         }
    },[])
    // console.log(post)
    return(
        <Box className={classes.root}>
            <Box className={classes.bodyContainer}>
                {post?.map((post,idx) => (
                    <Box key={idx} className={classes.container}>
                        <em>{post.title}</em> <br/> <strong>{post.body}</strong>
                    </Box>
                ))}
                {!cancelFetch &&
                 <Box className={classes.container}
                style={{backgroundColor:"red"}}
                 ref={loader}>
                     Loading New Post
                </Box>}
            </Box>
        </Box>
    )
}

export default Home