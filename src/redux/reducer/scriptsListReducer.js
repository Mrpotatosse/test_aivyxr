const initialState = []

let id = initialState.length;

export const SCRIPTS_LIST_ADD = 'scripts_list/add';
export const SCRIPTS_LIST_ADD_LIST = 'scripts_list/add_list';
export const SCRIPTS_LIST_REMOVE = 'scripts_list/remove';
export const SCRIPTS_LIST_UPDATE = 'scripts_list/update';
export const SCRIPTS_LIST_CLEAR = 'scripts_list/clear';

export const scriptsListReducer = (state=initialState, action) => {
    switch(action.type){
        case SCRIPTS_LIST_ADD: 
            return [...state, {...action.payload, id: ++id}];
        case SCRIPTS_LIST_ADD_LIST:
            return [...state, ...action.payload.map(x => ({...x, id: ++id}))];
        case SCRIPTS_LIST_REMOVE:
            return state.filter(x => x.id !== action.payload);
        case SCRIPTS_LIST_UPDATE:
            return state.map(x => x.id === action.payload.id ? {...x, ...action.payload} : x);
        case SCRIPTS_LIST_CLEAR:            
            return state.filter(x => action.payload ? action.payload(x) : true);
        default:
            return state;
    }
}