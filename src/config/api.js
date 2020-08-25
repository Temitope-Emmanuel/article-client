export default (method,url,payload,token,format = true ) => {
    console.log("calling the api",payload,format)
    return fetch(`http://localhost:3001/api/${url}`,{
        method:method.toUpperCase(),
        headers:{
            'Accept':'application/json',
            // 'Content-Type':format ? 'application/json' : 'multipart/form-data',
            "Authorization":`Bearer ${token}`
        },
        body:format ? JSON.stringify(payload) : payload
    }).catch(err => {
        console.log(err)
    })
}