import apiCall from "../config/api"

export const login = (user) => {
    try{
        return apiCall('POST','auth/login',user)
    }catch(err){
        console.log(err)
    }
} 