import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { customListReducer } from '../reducer/customListReducer';
import { dofusCharactersListReducer } from '../reducer/dofusCharactersListReducer';
import { headerListReducer } from '../reducer/headerListReducer';
import { processLauncherReducer } from '../reducer/processLauncherReducer';
import { scriptsListReducer } from '../reducer/scriptsListReducer';
import { serverCreationReducer } from '../reducer/serverCreationReducer';
import { serverInformationsReducer } from '../reducer/serverInformationsReducer';

export default createStore(
    combineReducers({
        list: customListReducer,
        header: headerListReducer,
        server_creation: serverCreationReducer,
        server_informations: serverInformationsReducer,
        process_launcher: processLauncherReducer,
        scripts_list: scriptsListReducer,
        dofus_characters_list: dofusCharactersListReducer
    }),
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)