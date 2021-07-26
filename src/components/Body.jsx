import { Switch, Route } from 'react-router';

import '../assets/css/body.css';
import ServerCreationStore from './body/ServerCreation';
import ServerInformationsStore from './body/ServerInformations';
import ProcessLauncherStore from './body/ProcessLauncher';
import PageNotFound from './body/PageNotFound';
import ScriptsListStore from './body/ScriptsList';
import Home from './body/Home';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { headerListClearAction, headerListFetchDofusCharacters } from '../redux/action/headerListAction';
import DofusCharacterStore from './body/DofusCharacter';
import { dofusCharactersListFetchAction } from '../redux/action/dofusCharactersListAction';

export default function Body(){
    const dispatch = useDispatch();

    const message_log_show = useCallback(data => {
        const data_parsed = JSON.parse(data.data);
        if(data_parsed.type === 'message_log'){
          if(data_parsed.data.message.__name === 'CharacterSelectedSuccessMessage'){
            dispatch(headerListClearAction(x => !x.link.startsWith('/dofus/characters')));
            dispatch(headerListFetchDofusCharacters());
          }
          
          if(data_parsed.data.message.__name === 'MapComplementaryInformationsDataMessage' ||
            data_parsed.data.message.__name === 'MapComplementaryInformationsAnomalyMessage' ||
            data_parsed.data.message.__name === 'MapComplementaryInformationsDataInHavenBagMessage' ||
            data_parsed.data.message.__name === 'MapComplementaryInformationsDataInHouseMessage' ||
            data_parsed.data.message.__name === 'MapComplementaryInformationsWithCoordsMessage' ||
            data_parsed.data.message.__name === 'MapComplementaryInformationsBreachMessage' ||
            data_parsed.data.message.__name === 'GameRolePlayShowActorMessage' ||
            data_parsed.data.message.__name === 'GameRolePlayShowActorWithEventMessage' ||
            data_parsed.data.message.__name === 'GameRolePlayShowMultipleActorsMessage' ||
            data_parsed.data.message.__name === 'GameContextRemoveElementMessage' ||
            data_parsed.data.message.__name === 'GameContextRemoveElementWithEventMessage' ||
            data_parsed.data.message.__name === 'GameContextRemoveMultipleElementsMessage' ||
            data_parsed.data.message.__name === 'GameContextRemoveMultipleElementsWithEventsMessage' ||
            data_parsed.data.message.__name === 'GameMapMovementMessage'){
            dispatch(dofusCharactersListFetchAction());
          }
        }

        if(data_parsed.type === 'dofus_client_disconnected'){
            dispatch(headerListClearAction(x => !x.link.startsWith('/dofus/characters')));
            dispatch(headerListFetchDofusCharacters());
        }
      }, [dispatch]);
    
      useEffect(() => {
        let client = new WebSocket(`${process.env.REACT_APP_BACKEND_WS_URL}`);
    
        client.addEventListener('message', message_log_show);
    
        return () => {
          client.removeEventListener('message', message_log_show);
        }
      }, [message_log_show]);  


    return <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/servers">
            <ServerCreationStore/>
        </Route>
        <Route exact path="/servers/:port" render={
            ({ match }) => {
                return <ServerInformationsStore port={parseInt(match.params.port)}/>
            }   
        }/>      
        <Route path="/play">
            <ProcessLauncherStore/>
        </Route>
        <Route path="/scripts">
            <ScriptsListStore/>
        </Route>
        <Route path="/dofus/characters/:id" render={
            ({ match }) => {
                return <DofusCharacterStore id={parseInt(match.params.id)}/>
            }
        }/>
        <Route path="/">
            <PageNotFound/>
        </Route>
    </Switch>
}