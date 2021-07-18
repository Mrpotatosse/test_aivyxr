import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { customListRemoveAction } from '../redux/action/customListAction';
import { customListSelector } from '../redux/selector';

function CustomListItem({item, onRemove}){
    return <li>
        { item.link ? <Link to={item.link}>{item.title}</Link> : item.title }        
        <button onClick={() => onRemove(item)}>X</button>
    </li>
}

export function CustomList({list, onRemove}){
    return <ul>
        {list.map(item => <CustomListItem item={item} onRemove={onRemove} key={item.id}/>)}
    </ul>
}

export default function CustomListStore(){
    const list = useSelector(customListSelector);
    
    const dispatch = useDispatch();

    const onRemove = useCallback(item => {
        dispatch(customListRemoveAction(item));
    }, [dispatch]);

    return <CustomList list={list} onRemove={onRemove}/>
}