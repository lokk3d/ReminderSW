/*
Idea: realizzare un generatore con yeoman che eseguito in una cartella lista tutti i file dal quale scelgo il file. 
Una volta scelto il file ti chiede il nome dell'azione: es inserisco "nome azione"
Mi chiede se è un collegamento ad una rest api
lui in automatico genera:

const NOME_AZIONE = "NOME_AZIONE"

export const setNomeAzione = (arg) =>{
    return {
        type:NOME_AZIONE,
        payload:{
            token:arg
        }
    }
}

aggiunge poi il collegamento all'azione nello switch del reducer con => case NOME_AZIONE: return { ...state }


https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md
se so che è il collegamento ad un'api mi genera le 3 azioni (pending, fulfilled, rejected) con tutto il codice per le verifiche etc
potrebbe rendere tutto il processo di sviluppo molto più rapido andando a rimuovere l'errore umano (aaaa quetti bag Cit.)

*/

const SET_FIRST_NAME = "SET_FIRST_NAME"
const SET_LAST_NAME = "SET_LAST_NAME"
const SET_FISCAL_CODE = "SET_FISCAL_CODE"

export const setFirstName = (name) =>{
    return {
        type:SET_FIRST_NAME,
        payload:{
            token:name
        }
    }
}

export const setLastName = (name) =>{
    return {
        type:SET_LAST_NAME,
        payload:{
            token:name
        }
    }
}

export const setFiscalCode = (cf) =>{
    return {
        type:SET_FISCAL_CODE,
        payload:{
            token:cf
        }
    }
}


export const userPreferencesReducer = function(state = {}, action){
    switch(action.type){
        case SET_FIRST_NAME:
            return state
        case SET_LAST_NAME:
            return state
        case SET_FISCAL_CODE:
            return state
    }
    return state
}
