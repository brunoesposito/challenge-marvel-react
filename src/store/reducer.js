import INITIAL_STATE from './state';

function Reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_HEROE_CHANGE':
            return {...state, heroeChange: [...state.heroeChange, action.change]}
        default:
            return state
    }
}

export default Reducer;
