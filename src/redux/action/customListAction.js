import { LIST_ADD, LIST_REMOVE, LIST_UPDATE } from '../reducer/customListReducer';

export const customListAddAction = (item) => ({
    type: LIST_ADD,
    payload: item
});

export const customListRemoveAction = (item) => ({
    type: LIST_REMOVE,
    payload: item.id
});

export const customListUpdateAction = (item) => ({
    type: LIST_UPDATE,
    payload: item
});