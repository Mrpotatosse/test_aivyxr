import { SERVER_INFORMATIONS_SET, SERVER_INFORMATIONS_UPDATE } from '../reducer/serverInformationsReducer';

export const serverInformationsUpdateAction = (item) => ({
    type: SERVER_INFORMATIONS_UPDATE,
    payload: item
});

export const serverInformationsSetAction = (item) => ({
    type: SERVER_INFORMATIONS_SET,
    payload: item
});

export const serverInformationsFetchAction = (port) => dispatch => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/servers/informations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            port
        })
    })
    .then(res => res.json())
    .then(data => {
        dispatch(serverInformationsSetAction(data));
    })
    .catch(error => {
        dispatch(serverInformationsSetAction({
            result: 'error', reason: error.message
        }));
    });
}