// import React from "react"
// import {makeStyles} from "@material-ui/core/styles"
// import {Container,Box,Slide} from "@material-ui/core"

// const useStyles = makeStyles(theme =>({
//     root:{
//         margin:theme.spacing(0,2),
//         width:"65vw",
//         margin:'0 auto',
//         minHeight:"60vh",
//         backgroundColor:"whitesmoke",
//         borderRadius:"1em"
//     },
//     tabs:{
//         display:"flex",
//         // backgroundColor:"yellow",
//         justifyContent:"center",
//         "& > *":{
//             margin:theme.spacing(0,2),
//             listStyle:"none",
//             fontSize:"2em"
//         }
//     },
//     link:{
//         "& > *":{
//             fontSize:'1em',

//         }
//     },
//     active:{
//         height: "2em",
//         backgroundColor: "white"
//     }
// }))

// const TabsContext = React.createContext({
//     activeName:""
// })    

// const Tabs = (props) => {
//     const classes = useStyles()
//     const [state,setState] = React.useState({
//         activeName:"",
//         activeContent:null
//     })
//     const handleTabClick = (name,content,idx) => {
//         setState({activeName:name,activeContent:content})
//         props.setView(idx)
//     }
//     return(
//         <Container className={classes.root}>
//             <TabsContext.Provider 
//              value={{
//                  activeName:state.activeName ? state.activeName : "",
//                  handleTabClick:handleTabClick,
//                  classes
//                  }} >
//                     {state.activeContent}
//                     <ul className={classes.tabs}>
//                         {props.children}
//                     </ul>
//             </TabsContext.Provider>
//         </Container>
//     )
// }

// Tabs.Tab = (props) => (
//     <TabsContext.Consumer>
//             {(context) => {
//                 if(!context.activeName && props.initialActive){
//                     if(context.handleTabClick){
//                         context.handleTabClick(props.name,props.body)
//                         return null
//                     }
//                 }
//                 const activeName = context.activeName ? context.activeName 
//                                     : props.initialActive 
//                                     ? props.name : "";
                
//                 const handleTabClick = (e) => {
//                     if(context.handleTabClick){
//                         context.handleTabClick(props.name,props.children,props.idx)
//                     }
//                 }
//                 return(
//                     <li
//                     className={`${context.classes.link} ${props.name === activeName  &&  context.classes.active}`}
//                     onClick={handleTabClick} >
//                         {props.heading()}
//                     </li>
//                 )
//             }}
//         </TabsContext.Consumer>
// )

// export default Tabs


// <Tabs setView={setCurrentView} >
// <Tabs.Tab heading={() =>(
//     <Button>
//         <Typography variant="caption" >Write a new Article</Typography>
//     </Button>
// )} name="Write a new Article" idx={0} initialActive={true}
// >
//     <Box className={classes.previewContainer}>
//         <TextField required 
//             id="Input Text" label="Write markdown to create article"
//             value={text} multiline rows={10}
//             onChange={handleChange} variant="outlined"
//             style={{margin:"3em 0"}} fullWidth
//             margin="dense"
//         />
//     </Box>
// </Tabs.Tab>

// <Tabs.Tab name="Preview" heading={() => (
//     <Button>
//         <Typography variant="caption" >
//             Preview
//         </Typography>
//     </Button>)}>
//     <Box className={classes.previewContainer} >
//         <Markdown>{text}</Markdown>
//     </Box>
//     </Tabs.Tab>
// </Tabs>
