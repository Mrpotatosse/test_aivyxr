const initialState = [
    {
        id: 1,
        title: 'home',
        link: '/'
    },    
    {
        id: 2,
        title: 'aivy',
        link: '/link'
    }
]

let id = initialState.length;

export const LIST_ADD = 'list/add';
export const LIST_REMOVE = 'list/remove';
export const LIST_UPDATE = 'list/update';

export const customListReducer = (state=initialState, action) => {
    switch(action.type){
        case LIST_ADD: 
            return [...state, {...action.payload, id: ++id}];
        case LIST_REMOVE:
            return state.filter(x => x.id !== action.payload);
        case LIST_UPDATE:
            return state.map(x => x.id === action.payload.id ? {...x, ...action.payload} : x);
        default:
            return state;
    }
}