

export const meetingReducer = (state = [], action) => {
    switch(action.type){
        case ADD_MEETING:
            return  state.push(action.payload)
    }
}