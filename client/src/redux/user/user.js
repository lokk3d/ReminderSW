const GET_TOKEN = "GET_TOKEN"
const SET_TOKEN = "SET_TOKEN"


export const setToken = (token) =>{
    return {
        type:SET_TOKEN,
        payload:{
            token:token
        }
    }
}

export function getToken(token){
    return {
        type:GET_TOKEN
    }
}


export const userReducer = function(state = {token:"", appTitle:"Redeo"}, action){
    switch(action.type){
        case SET_TOKEN:
            return {...state, token: action.payload.token}
    }
    return state
}
