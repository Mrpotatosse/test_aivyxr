import '../../assets/css/server_informations.css';

import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { serverInformationsSelector } from '../../redux/selector';
import { serverInformationsFetchAction, serverInformationsUpdateAction } from '../../redux/action/serverInformationsAction';
import { headerListClearAction } from '../../redux/action/headerListAction';

import PageNotFound from './PageNotFound';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg';

function ServerInformationsElement({ name, value }) {
    return <li className="server-information-element centered">
        {value}
    </li>
}

export function ServerInformations({ informations, onRunned, onRemove }) {
    if (informations.result === 'error' || informations.port === 0) {
        return <PageNotFound />
    }

    return <div className="body server-information-ul">
        <ul className="server-information-list">
            {Object.keys(informations).map((v, i) => {
                if (v === 'is_running') return undefined;
                return <ServerInformationsElement name={v} value={informations[v]} key={i} />
            })}
            <li className="centered">
                <button className="server-information-btn pbtn" onClick={async event => onRunned()}>{informations.is_running ? 'Stop' : 'Start'}</button>
                <button className="server-information-btn pbtn" onClick={async event => onRemove()}><Trash/></button>
                <Link className="d-none" id="siredirector-rmv-link" to="/servers" />
            </li>
        </ul>
    </div>
}

export default function ServerInformationsStore({ port }) {
    const informations = useSelector(serverInformationsSelector);

    const dispatch = useDispatch();

    const onRunned = useCallback(async () => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/servers/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ port })
        })
            .then(res => res.json());

        if (result.result === 'ok') {
            dispatch(serverInformationsUpdateAction(result.data));
        }
    }, [dispatch, port]);

    const onRemove = useCallback(async () => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/servers/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ port })
        })
            .then(res => res.json());

        if (result.result === 'ok') {
            document.getElementById('siredirector-rmv-link').click();
            dispatch(headerListClearAction(x => x.link !== `/servers/${port}`));
        }
    }, [dispatch, port]);

    useEffect(() => {
        dispatch(serverInformationsFetchAction(port));
    }, [dispatch, port]);

    return <ServerInformations informations={informations} onRunned={onRunned} onRemove={onRemove} />;
}