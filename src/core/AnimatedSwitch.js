import React from "react"
import {Switch,withRouter } from "react-router-dom"
import posed,{PoseGroup} from "react-pose"


const AnimatedSwitch = ({history,location,children,...rest}) => {
    const reverse = location.pathname === "/";

    return(
        <PoseGroup preEnterPose={reverse ? "leftSide" : "rightSide"}
         flipMove={false} exitPose={reverse ? "rightSide" : "leftSide"} >
             <ContextRouteAnimation key={location.pathname} >
                 <Switch location={location} {...rest} >
                     {children}
                 </Switch>
             </ContextRouteAnimation>
        </PoseGroup>
    )
}

export const ContextRouteAnimation = posed.div({
    enter: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 400
        }
      },
      leftSide: {
        x: "-100%",
        opacity: 0,
        scale: 1.5,
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 400
        }
      },
      rightSide: {
        x: "100%",
        opacity: 0,
        scale: 1.5,
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 400
        }
      }
})

export default withRouter(AnimatedSwitch)