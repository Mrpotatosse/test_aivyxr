import { HEADER_LIST_ADD, HEADER_LIST_ADD_LIST, HEADER_LIST_CLEAR, HEADER_LIST_REMOVE, HEADER_LIST_UPDATE } from '../reducer/headerListReducer';

export const headerListAddAction = (item) => ({
    type: HEADER_LIST_ADD,
    payload: item
});

export const headerListAddListAction = (item) => ({
    type: HEADER_LIST_ADD_LIST,
    payload: item
});

export const headerListRemoveAction = (item) => ({
    type: HEADER_LIST_REMOVE,
    payload: item.id
});

export const headerListUpdateAction = (item) => ({
    type: HEADER_LIST_UPDATE,
    payload: item
});

export const headerListClearAction = (filter) => ({
    type: HEADER_LIST_CLEAR,
    payload: filter
});

export const headerListFetchAction = () => dispatch => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/servers/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(headerListAddListAction(data));
    });
};