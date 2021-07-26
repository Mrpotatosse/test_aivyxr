import { SCRIPTS_LIST_ADD, SCRIPTS_LIST_ADD_LIST, SCRIPTS_LIST_CLEAR, SCRIPTS_LIST_REMOVE, SCRIPTS_LIST_UPDATE } from '../reducer/scriptsListReducer';

export const scriptsListAddAction = (item) => ({
    type: SCRIPTS_LIST_ADD,
    payload: item
});

export const scripsListAddListAction = (item) => ({
    type: SCRIPTS_LIST_ADD_LIST,
    payload: item
});

export const scriptsListRemoveAction = (item) => ({
    type: SCRIPTS_LIST_REMOVE,
    payload: item.id
});

export const scriptsListUpdateAction = (item) => ({
    type: SCRIPTS_LIST_UPDATE,
    payload: item
});

export const scriptsListClearAction = (item) => ({
    type: SCRIPTS_LIST_CLEAR,
    payload: item
});

export const scriptsListFetchAction = () => dispatch => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/scripts/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(scriptsListClearAction(i => false));
        dispatch(scripsListAddListAction(data));
    });
};