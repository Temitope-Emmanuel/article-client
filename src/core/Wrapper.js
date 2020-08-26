import React from "react"
import React from "react"

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