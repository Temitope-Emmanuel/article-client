import React from "react"

export default (initialState) => {
    const [state,setState] = React.useState(initialState)

    const handleChange = (e) => {
        setState(e.target.value)
    }
    const resetState = () => {
        setState(initialState)
    }
    
    return [state,handleChange,resetState]
}