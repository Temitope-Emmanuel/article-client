import apiCall from "../config/api"

export const createArticle = (payload,user,format) => {
        return apiCall('POST',`article/by/${user.id}`,payload,user.token,format).then(response => response.json())
}


export const getAllArticle = async (params,signal) => {
        try{
                const response = await fetch('https://article-server.herokuapp.com/api/articles',{
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
                const response = await fetch(`https://article-server.herokuapp.com/api/article/${params}`,{
                        method:'GET',
                        signal
                })
                return response.json()
        }catch(err){
                console.log(err)
        }
}