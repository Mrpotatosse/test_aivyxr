const initialState = [{
    character: {
        id: 1
    }
}];

export const DOFUS_LIST_SET = 'dofus_list/set';

export const dofusCharactersListReducer = (state=initialState, action) => {
    switch(action.type){
        case DOFUS_LIST_SET:
            return action.payload;
        default:
            return state;
    }
}