import { DOFUS_LIST_SET } from '../reducer/dofusCharactersListReducer';

export const dofusCharactersListSetAction = (item) => ({
    type: DOFUS_LIST_SET,
    payload: item
});

export const dofusCharactersListFetchAction = () => dispatch => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/dofus/characters/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(dofusCharactersListSetAction(data));
    });
}