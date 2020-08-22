export default (method,url,payload,format) => {
        return fetch(`http://localhost:3001/api/${url}`,{
            method:method.toUpperCase(),
            headers:{
                'Accept':'application/json',
                'Content-Type': format || 'application/json',

            },
            body:format ? payload : JSON.stringify(payload)
        }).catch(err => {
            console.log(err)
        })
}