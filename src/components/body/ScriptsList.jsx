import '../../assets/css/scripts_list.css';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { scriptsListAddAction, scriptsListFetchAction, scriptsListRemoveAction } from '../../redux/action/scriptsListAction';
import { scriptsListSelector } from '../../redux/selector';

import { ReactComponent as Play } from '../../assets/svg/play.svg';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';

export function ScritsListItem({item, onExecute, onRemove}){
    return <li className="scripts-list-item">
        <span className="slname centered">{item.name}</span>
        <Link className="slurl centered pbtn" to={{ pathname: item.url }} target="_blank">{item.url}</Link>    
        <span className="slbtn1 centered pbtn" onClick={event => onExecute(item)}><Play/></span>
        <span className="slbtn2 centered pbtn" onClick={event => onRemove(item)}><Trash/></span>
    </li>
}

export function ScriptsList({ list, onExecute, onRemove, onAdd }){
    return <div className="body scripts-list">
        <ul className="scripts-list-ul">
            {list.map((v, i) => <ScritsListItem key={i} item={v} onExecute={onExecute} onRemove={onRemove}/>)}
            <li className="scripts-list-add-li">
                <input id="slname-i" className="slname centered scripts-list-add-input" placeholder="name" type="text"></input>
                <input id="slurl-i" className="slurl centered scripts-list-add-input" placeholder="url" type="text"></input>    
                <span className="slbtn centered pbtn" onClick={event => {
                    const name = document.getElementById('slname-i').value;
                    const url = document.getElementById('slurl-i').value;
                    onAdd({
                        name, url
                    });
                }}><Plus/></span>
            </li>
        </ul>
    </div>
}

export default function ScriptsListStore(){
    const list = useSelector(scriptsListSelector);

    const dispatch = useDispatch();

    const onExecute = useCallback(async item => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/scripts/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());
    }, []);

    const onRemove = useCallback(async item => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scripts/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());

        if(result.result === 'ok'){
            dispatch(scriptsListRemoveAction(item));
        }
    }, [dispatch]);

    const onAdd = useCallback(async item => {             
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scripts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());

        if(result.result === 'ok'){
            dispatch(scriptsListAddAction(item));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(scriptsListFetchAction());
    }, [dispatch]);

    return <ScriptsList list={list} onExecute={onExecute} onRemove={onRemove} onAdd={onAdd}/>;
}