import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import HeaderListStore from './components/HeaderList';
import Body from './components/Body';

import './App.css';

function App(){
  return <Provider store={store}>
    <BrowserRouter>
      <HeaderListStore/>
      <Body/>
    </BrowserRouter>
  </Provider>
}

export default App;
