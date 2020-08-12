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
        borderRadius:"3em 0 0 3em",
        boxShadow:"24px 24px 5px 5px rgba(0,0,0,.5)",
        overflowX:"hidden",
        padding:"0 2em"
    },
    container:{
        backgroundColor:"white",
        margin:".5em 0",
        height:"30%",
        width:"100%",
        borderRadius:".3em",
        padding:"0 1em",
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

const Home = () => {
    const classes = useStyles()
    const [post,setPost] = React.useState([])
    // This holds the ref for the oberserver element
    const loader = React.useRef(null)
    const [check,setCheck] = React.useState(false)
    const [cancelFetch,setCancelFetch] = React.useState(false)
    const [error,setError] = React.useState(true)

    // This is for getting a single post from json placholder
    const callFetch = (idx) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${idx}`)
        .then(response => response.json())
        .catch(err => console.log(err))
    }


    // This is the handler function passed to the observer for when the element enters viewport
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

    // This get all 10 post together
    React.useEffect(() => {
        const getPost  = async () => {
            let newArr = [];
            for(var i = 1;i < 10;i++){
                newArr.push(callFetch(i+post.length))
            }
            // Then uses promise.all to wait for them to resolve
            const p = await Promise.all(newArr)
            if(p.some(p => p === undefined)){
                setError(true)
            }else{
                setError(false)
                const newPost = post.concat(p)
                setPost(newPost)
                if(post.length >= 99 ){
                    setCancelFetch(true)
                }
            }
        }
        getPost()
    },[check])

    // For testing when the post is about to reach the limit of 100
    React.useEffect(() => {
        if(post.length >= 99){
            setCancelFetch(true)
        }
    },[post])

    // For setting the observer on component mount
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
    return(
        <Box className={classes.root}>
            <Box className={classes.bodyContainer}>
                <h2>Flowless</h2>
                { error ? <h1>Something went wrong </h1> : post.map((post,idx) => (
                    <Box key={idx} className={classes.container}>
                        <em>{post.title}</em> <br/> <strong>{post.body}</strong>
                    </Box>
                ))}
                {/* This is the observer element we make it
                 dissappear when the post has reached it limit */}
                {!cancelFetch &&
                 <Box className={classes.container}
                style={{backgroundColor:"red"}}
                // This is the ref that was passed to it to make it accessible to the intersection observer
                 ref={loader}>
                    {error ? "Perhaps Error with Network" : "Loading New Post"}
                </Box>}
            </Box>
        </Box>
    )
}

export default Home