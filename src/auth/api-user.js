import apiCall from '../config/api'

export const create = async (user) => {
    try{
        return apiCall('POST','user',user)
    }catch(err){
        console.log(err)
    }
}