
export const authenticate = (jwt,cb) =>{
    localStorage.setItem('jwt',JSON.stringify(jwt))
    if(cb){
        cb()
    }
}

export function isAuthenticated(){
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}

export function clearJwt(callback){
    localStorage.removeItem('jwt')
}