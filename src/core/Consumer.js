import React from "react"
import {AlertContext} from "../MainRouter"


function AlertHOC(Component){
    return function AlertComponent({...props}){
        return(
            <AlertContext>
                {(context) => (
                    <Component context={context} {...props} />
                )}
            </AlertContext>
        )
    }
}

export default AlertHOC