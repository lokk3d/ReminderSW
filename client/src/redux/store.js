import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

import {userReducer} from "./user/user"


const middleware = applyMiddleware(createPromise(), thunk, createLogger())

const reducers = combineReducers({
    user: userReducer
})

//Creo lo store
export const store = createStore(reducers, middleware)


