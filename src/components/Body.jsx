import { Switch, Route } from 'react-router';

import '../assets/css/body.css';
import ServerCreationStore from './body/ServerCreation';
import ServerInformationsStore from './body/ServerInformations';
import ProcessLauncherStore from './body/ProcessLauncher';
import PageNotFound from './body/PageNotFound';
import ScriptsListStore from './body/ScriptsList';
import Home from './body/Home';

export default function Body(){
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
        <Route path="/">
            <PageNotFound/>
        </Route>
    </Switch>
}