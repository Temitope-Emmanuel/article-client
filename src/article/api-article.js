import apiCall from "../config/api"

export const createArticle = (payload,user,format) => {
        return apiCall('POST',`article/by/${user.id}`,payload,user.token,format).then(response => response.json())
}