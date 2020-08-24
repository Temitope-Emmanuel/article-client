export default (method,url,payload,token,format) => {
        return fetch(`http://localhost:3001/api/${url}`,{
            method:method.toUpperCase(),
            headers:{
                'Accept':'application/json',
                'Content-Type': format || 'application/json',
                "Authorization":`Bearer ${token}`
            },
            body:format ? payload : JSON.stringify(payload)
        }).catch(err => {
            console.log(err)
        })
}