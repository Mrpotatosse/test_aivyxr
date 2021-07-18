const initialState = []

let id = initialState.length;

export const PROCESS_LAUNCHER_ADD = 'process_launcher/add';
export const PROCESS_LAUNCHER_ADD_LIST = 'process_launcher/add_list';
export const PROCESS_LAUNCHER_REMOVE = 'process_launcher/remove';
export const PROCESS_LAUNCHER_UPDATE = 'process_launcher/update';
export const PROCESS_LAUNCHER_CLEAR = 'process_launcher/clear';

export const processLauncherReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_LAUNCHER_ADD:
            return [...state, { ...action.payload, id: ++id }];
        case PROCESS_LAUNCHER_ADD_LIST:
            return [...state, ...action.payload.map(x => ({...x, id: ++id}))];
        case PROCESS_LAUNCHER_REMOVE:
            return state.filter(x => x.id !== action.payload);
        case PROCESS_LAUNCHER_UPDATE:
            return state.map(x => x.id === action.payload.id ? { ...x, ...action.payload } : x);
        case PROCESS_LAUNCHER_CLEAR:
            return state.filter(x => action.payload ? action.payload(x) : true);
        default:
            return state;
    }
}