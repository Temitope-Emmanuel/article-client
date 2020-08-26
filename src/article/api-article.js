import apiCall from "../config/api"

export const createArticle = (payload,user,format) => {
        return apiCall('POST',`article/by/${user.id}`,payload,user.token,format).then(response => response.json())
}


export const getAllArticle = async (params,signal) => {
        try{
                const response = await fetch('http://localhost:3001/api/articles',{
                        method:"POST",
                        signal,
                        body:JSON.stringify(params)
                })
                return response.json()                
        }catch(err){
                console.log(err)
        }
}

export const readArticle = async (params,signal) => {
        try{
                const response = await fetch(`http://localhost:3001/api/article/${params}`,{
                        method:'GET',
                        signal
                })
                return response.json()
        }catch(err){
                console.log(err)
        }
}