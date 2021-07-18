const initialState = {
    title: '',
    port: 0,
    is_running: false,
    uptime: '',
    type: ''
}

export const SERVER_INFORMATIONS_UPDATE = 'server_informations/update';
export const SERVER_INFORMATIONS_SET = 'server_informations/set';

export const serverInformationsReducer = (state=initialState, action) => {
    switch(action.type){
        case SERVER_INFORMATIONS_UPDATE:
            return {...state, ...action.payload};
        case SERVER_INFORMATIONS_SET:
            return action.payload;
        default:
            return state;
    }
}