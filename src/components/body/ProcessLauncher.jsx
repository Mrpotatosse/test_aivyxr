import '../../assets/css/process_launcher.css';

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processLauncherAddAction, processLauncherFetchAction, processLauncherRemoveAction } from "../../redux/action/processLauncherAction";
import { processLauncherSelector } from "../../redux/selector";

import { ReactComponent as Play } from "../../assets/svg/play.svg";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";
import { ReactComponent as Plus } from "../../assets/svg/plus.svg";

function ProcessLauncherItem({item, onPlay, onRemove}){
    return <li className="process-launcher-list-item">
        <span className="ppath centered">{item.path}</span>
        <span className="pport centered">{item.port}</span>        
        <span className="pbtn1 centered pbtn" onClick={event => onPlay(item)}>{item.icon ? <img alt="icon" src={item.icon} className="process-launcher-list-item-btn-img"></img> : <Play/>}</span>
        <span className="pbtn2 centered pbtn" onClick={event => onRemove(item)}><Trash/></span>
    </li>
}

export function ProcessLauncher({list, onAdd, onPlay, onRemove}){
    return <div className="body process-launcher">
        <ul className="process-launcher-list">
            {list.map(item => <ProcessLauncherItem item={item} key={item.id} onPlay={onPlay} onRemove={onRemove}/>)}
            <li className="process-launcher-list-add-path">
                <input id="ppath-i" className="ppath centered process-launcher-list-add-input" placeholder="path" type="text"></input>
                <input id="pport-i" className="pport centered process-launcher-list-add-input" placeholder="port" type="text" onChange={event => {
                    const integer = parseInt(event.target.value);
                    if (!isNaN(integer)) {
                        event.target.value = `${integer}`;
                    } else {
                        event.target.value = '';
                    }
                }}></input>    
                <span className="pbtn1 centered pbtn" onClick={event => {
                    const path = document.getElementById('ppath-i').value;
                    const port = parseInt(document.getElementById('pport-i').value);
                    onAdd({
                        path, port
                    });
                }}><Plus/></span>
            </li>
        </ul>
    </div>
}

export default function ProcessLauncherStore(){
    const list = useSelector(processLauncherSelector);

    const dispatch = useDispatch();

    const onPlay = useCallback(async item => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/launch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());
    }, []);

    const onAdd = useCallback(async item => {        
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/launch/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());

        if(result.result === 'ok'){
            dispatch(processLauncherAddAction(item));
        }
    }, [dispatch]);

    const onRemove = useCallback(async item => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/launch/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json());

        if(result.result === 'ok'){
            dispatch(processLauncherRemoveAction(item));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(processLauncherFetchAction());
    }, [dispatch]);

    return <ProcessLauncher list={list} onPlay={onPlay} onRemove={onRemove} onAdd={onAdd}/>
}