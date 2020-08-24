import apiCall from "../config/api"

export const createArticle = (payload,user) => {
        return apiCall('POST',`article/by/${user.id}`,payload,user.token).then(response => response.json())
}

