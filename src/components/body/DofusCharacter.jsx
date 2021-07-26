import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dofusCharactersListFetchAction } from '../../redux/action/dofusCharactersListAction';
import { dofusCharactersListSelector } from '../../redux/selector';
import PageNotFound from './PageNotFound';

export function DofusCharacter({informations}){ 
    if(!informations){
        return <PageNotFound/>
    }

    return <div className="body">
        {`${informations.character.name} Lv.${informations.character.level} (${informations.character.id}) map:${informations.map.mapId} [${informations.character.disposition.cellId}=${informations.character.disposition.direction}]`}
        <ul>
            {informations.map?.actors.map((x,i) => <li key={i}>{x.__name} [{x.disposition.cellId}={x.disposition.direction}]</li>)}
        </ul>
    </div>
}

export default function DofusCharacterStore({id}){
    const list = useSelector(dofusCharactersListSelector);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dofusCharactersListFetchAction());
    }, [dispatch]);

    return <DofusCharacter informations={list.find(x => x.character?.id === id)}/>
}