import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import '../assets/css/header.css';

import { headerListSelector } from '../redux/selector';
import { headerListFetchAction, headerListFetchDofusCharacters } from '../redux/action/headerListAction';

function HeaderListItem({ item, className }){
    return <li>
        <Link to={item.link} className={`centered ${className}`}>{item.icon ?? item.title}</Link>    
    </li>
}

export function HeaderList({ list }){
    return <ul className="header-ul">
        {list.map((item, index) => <HeaderListItem item={item} className={`li-bg-${index % 2 === 0 ? 'even': 'odd'}`} key={item.id}/>)}
    </ul>
}

export default function HeaderListStore(){
    const list = useSelector(headerListSelector);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headerListFetchAction());
        dispatch(headerListFetchDofusCharacters());
    }, [dispatch]);

    return <HeaderList list={list}/>
}