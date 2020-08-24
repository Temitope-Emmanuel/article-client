import apiCall from "../config/api"

export const createArticle = (payload,user) => {
    try{
        return apiCall('POST',`article/by/${user.id}`,payload,user.token).then(response => response.json())
    }catch(err){
        console.log(err)
    }
}

