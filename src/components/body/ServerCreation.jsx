import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { headerListAddAction } from '../../redux/action/headerListAction';
import { serverCreationUpdateAction } from '../../redux/action/serverCreationAction';
import { serverCreationSelector } from '../../redux/selector';

import '../../assets/css/server_creation.css';

import { dofusMitmInitialState } from '../../redux/reducer/serverCreationReducer';

function ServerCreationAdditionalInput({additional, item, onUpdate}){
    return additional.map((v, i) => {
        return <ServerCreationInput key={i} name={v.name} value={item[v.name] ?? v.default_value} type={v.type} onUpdate={onUpdate}/>
    });
}

export function ServerCreationInput({ name, className, value, type, onUpdate }) {
    if (type === 'list') {
        return <li className="centered">
            <span className="server-creation-input-list-name">{name.replace('additional_', '')}</span>
            <select className={`server-creation-input server-creation-select centered ${className}`} onChange={event => {
                onUpdate({
                    [name]: value.map(v => {
                        return v.toLowerCase() === event.target.value.toLowerCase() ? `:${v}` : v.replace(':', '');
                    })
                })
            }} defaultValue={value.find(v => v.startsWith(':')).replace(':', '')}>
                {value.map((v, i) => {
                    return <option key={i}>{v.replace(':', '')}</option>
                })}
            </select>
        </li>
    }

    if (type === 'checkbox') {
        return <li>
            CHECKBOX to do
        </li>
    }

    return <li className={`centered ${className}`}>
        <input id={`${type}-${name}-i`} className={`server-creation-input`} placeholder={name.replace('additional_', '').toUpperCase()} type={type} onChange={event => {
            if (Number.isInteger(value)) {
                const integer = parseInt(event.target.value);
                if (!isNaN(integer)) {
                    onUpdate({ [name]: integer });
                    event.target.value = `${integer}`;
                } else {
                    onUpdate({ [name]: 0 });
                    event.target.value = '';
                }
            } else {
                onUpdate({ [name]: event.target.value });
            }
        }} defaultValue={value === '' || value === 0 ? undefined : value}></input>
    </li>
}

export function ServerCreation({ item, onAdd, onUpdate }) {
    const [result, setResult] = useState(undefined);

    return <div className="body centered">
        <ul className="server-creation-ul server-creation-ul-error">
            <li className={`centered no-margin ${result ? '' : 'd-none'}`}>
                <span className="centered server-creation-error-txt">{result}</span>
            </li>
            {Object.keys(item).map((name, index) => {
                if (name.startsWith('additional_')) return undefined;
                const type = typeof item[name] === 'boolean' ? 'checkbox' : (Array.isArray(item[name]) ? 'list' : 'text');

                return <ServerCreationInput key={index} className={index === 0 && !result ? 'no-margin' : ''} name={name} type={type} value={item[name]} onUpdate={onUpdate} />
            })}
            {item.type.find(x => x.startsWith(':')) === ':/mitm/dofus' ? <ServerCreationAdditionalInput additional={dofusMitmInitialState} item={item} onUpdate={onUpdate}/> : undefined} 
            <li className="centered">
                <Link className="d-none" id="success-redirector" to={`/servers/${item.port}`}/>
                <input id="server-creation-button" className="server-creation-input server-creation-input-btn" type="button" value="Create" onClick={async () => {
                    const keys = Object.keys(item);
                    for (let i = 0; i < keys.length; i++) {
                        if (item[keys[i]] === '' || item[keys[i]] === 0) {
                            setResult(`${keys[i]} is missing`);
                            return;
                        }
                    }

                    const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/servers/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(item)
                    })
                        .then(res => res.json())
                        .catch(err => setResult('Unable to resolve http server'));

                    if (result && result.result === 'ok') {
                        onAdd({
                            ...item,
                            link: `/servers/${item.port}`
                        });
                        document.getElementById('success-redirector').click();
                    } else {
                        if(result) setResult(result.reason);
                    }
                }}></input>
            </li>
            <li className="centered no-margin">                
                <input id="server-creation-config-file" className="d-none" type="file" onChange={async (event) => {
                    const url = URL.createObjectURL(event.target.files[0]);
                    const result = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .catch(err => setResult('File is not JSON format'));
                        
                    if(result){
                        onUpdate(result);    
                        document.getElementById('server-creation-button').click();
                    }
                }}></input>
                <input className="server-creation-input server-creation-input-btn" type="button" value="Create from config" onClick={() => {
                    document.getElementById('server-creation-config-file').click();
                }}></input>
            </li>
        </ul>
    </div>
}

export default function ServerCreationStore() {
    const creation = useSelector(serverCreationSelector);

    const dispatch = useDispatch();

    const onAdd = useCallback(item => {
        dispatch(headerListAddAction(item));
    }, [dispatch]);

    const onUpdate = useCallback(item => {
        if(item.type){ // remove all additional
            const keys = Object.keys(creation).filter(key => key.startsWith('additional_'));
            const delete_obj = {};
            for(let k = 0;k<keys.length;k++){
                delete_obj[keys[k]] = undefined;
            }
            dispatch(serverCreationUpdateAction(delete_obj));
        }
        
        dispatch(serverCreationUpdateAction(item));
    }, [dispatch, creation]);

    return <ServerCreation item={creation} onAdd={onAdd} onUpdate={onUpdate} />
}