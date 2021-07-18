import { PROCESS_LAUNCHER_ADD, PROCESS_LAUNCHER_ADD_LIST, PROCESS_LAUNCHER_CLEAR, PROCESS_LAUNCHER_REMOVE, PROCESS_LAUNCHER_UPDATE } from '../reducer/processLauncherReducer';

export const processLauncherAddAction = (item) => ({
    type: PROCESS_LAUNCHER_ADD,
    payload: item
});

export const processLauncherAddListAction = (item) => ({
    type: PROCESS_LAUNCHER_ADD_LIST,
    payload: item
});

export const processLauncherRemoveAction = (item) => ({
    type: PROCESS_LAUNCHER_REMOVE,
    payload: item.id
});

export const processLauncherUpdateAction = (item) => ({
    type: PROCESS_LAUNCHER_UPDATE,
    payload: item
});

export const processLauncherClearAction = (filter) => ({
    type: PROCESS_LAUNCHER_CLEAR,
    payload: filter
});

export const processLauncherFetchAction = () => dispatch => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/launch/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(processLauncherClearAction(i => false));
        dispatch(processLauncherAddListAction(data));
    });
};