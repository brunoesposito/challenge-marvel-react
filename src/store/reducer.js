import INITIAL_STATE from './state';

function Reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET':
            return state
        default:
            return state
    }
}

export default Reducer;
