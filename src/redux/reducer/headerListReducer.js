import { ReactComponent as Home } from '../../assets/svg/home.svg'; 
import { ReactComponent as Server } from '../../assets/svg/server.svg';
import { ReactComponent as Play } from '../../assets/svg/play.svg';
import { ReactComponent as FileTxt } from '../../assets/svg/file_txt.svg';

const initialState = [
    {
        id: 1,
        link: '/',
        icon: <Home/>
    },    
    {
        id: 2,
        link: '/servers',
        icon: <Server/>
    },
    {
        id: 3,
        link: '/play',
        icon: <Play/>
    },
    {
        id: 4,
        link: '/scripts',
        icon: <FileTxt/>
    }
]

let id = initialState.length;

export const HEADER_LIST_ADD = 'header/add';
export const HEADER_LIST_ADD_LIST = 'header/add_list';
export const HEADER_LIST_REMOVE = 'header/remove';
export const HEADER_LIST_UPDATE = 'header/update';
export const HEADER_LIST_CLEAR = 'header/clear';

export const headerListReducer = (state=initialState, action) => {
    switch(action.type){
        case HEADER_LIST_ADD: 
            return [...state, {...action.payload, id: ++id}];
        case HEADER_LIST_ADD_LIST:            
            return [...state, ...action.payload.map(x => ({...x, id: ++id}))];
        case HEADER_LIST_REMOVE:
            return state.filter(x => x.id !== action.payload);
        case HEADER_LIST_UPDATE:
            return state.map(x => x.id === action.payload.id ? {...x, ...action.payload} : x);
        case HEADER_LIST_CLEAR:
            return state.filter(action.payload);
        default:
            return state;
    }
}