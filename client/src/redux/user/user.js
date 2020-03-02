const SET_TOKEN = "SET_TOKEN"
const LOG_OUT = "LOG_OUT"


export const setToken = (token) =>{
    return {
        type:SET_TOKEN,
        payload:{
            token:token
        }
    }
}

export const logOut = () =>{
    return {
        type:LOG_OUT
    }
}




export const userReducer = function(state = {token:"", appTitle:"Redeo"}, action){
    switch(action.type){
        case SET_TOKEN:
            return {...state, token: action.payload.token}
        case LOG_OUT:
            return {...state, token: ""}
    }
    return state
}
