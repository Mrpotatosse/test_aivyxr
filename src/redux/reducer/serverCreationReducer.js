const initialState = {
    title: '',
    port: 0,
    type: [
        ':/mitm/simple',
        '/mitm/dofus'
    ]
}

export const dofusMitmInitialState = [
    {
        name: 'additional_dofus_invoker',
        type: 'text'
    },
    {
        name: 'additional_dofus_map',
        type: 'text'
    },
    {
        name: 'additional_dofus_log_level',
        type: 'list',
        default_value: [
            ':none',
            'all',
            'client',
            'server'
        ]
    },
    {
        name: 'additional_dofus_log_type',
        type: 'list',
        default_value: [
            ':full',
            'content'
        ]
    }
]

export const SERVER_CREATION_UPDATE = 'server_creation/update';
export const SERVER_CREATION_SET = 'server_creation/set';

export const serverCreationReducer = (state=initialState, action) => {
    switch(action.type){
        case SERVER_CREATION_UPDATE:
            return {...state, ...action.payload};
        case SERVER_CREATION_SET:
            return action.payload;
        default:
            return state;
    }
}