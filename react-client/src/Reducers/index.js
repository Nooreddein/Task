const INIT_STATE = {
    lang:"em",
}

const langReducer = (state = INIT_STATE,  action)=>{
    switch(action.type){
        case "LANG": 
        return {...state,lang:action.payload}
        default:
        return state
    }
}

export default langReducer