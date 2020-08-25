export default (method,url,payload,token,format = false ) => {
    console.log("calling the api",payload,format)
    return fetch(`http://localhost:3001/api/${url}`,{
        method:method.toUpperCase(),
        headers:{
            'Accept':'application/json',
            'Content-Type':format ? 'multipart/form-data' : 'application/json',
            "Authorization":`Bearer ${token}`
        },
        body:format ? payload : JSON.stringify(payload)
    }).catch(err => {
        console.log(err)
    })
}