import React from "react"
import Box from "@material-ui/core/Box"

function WrapperHOC(Component){
    return function WrapperComponent(props){
        return(
            <Box style={{
                width:"100vw",
                height:"100vh",
                position:"fixed",
                overflow:"auto"
            }} >
                <Component {...props} />
            </Box>
        )
    }
}

export default WrapperHOC