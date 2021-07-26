import { SERVER_CREATION_SET, SERVER_CREATION_UPDATE } from '../reducer/serverCreationReducer';

export const serverCreationUpdateAction = (item) => ({
    type: SERVER_CREATION_UPDATE,
    payload: item
});

export const serverCreationSetAction = (item) => ({
    type: SERVER_CREATION_SET,
    payload: item
});