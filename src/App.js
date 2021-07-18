import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import HeaderListStore from './components/HeaderList';
import Body from './components/Body';

import './App.css';
import { useCallback, useEffect } from 'react';

function App(){
  const message_log_show = useCallback(data => {
    const data_parsed = JSON.parse(data.data);
    if(data_parsed.type === 'message_log'){
      //console.log(data_parsed.data.message); // useless look message from: Inspect element -> Network -> WS -> localhost directly
    }
  }, []);

  useEffect(() => {
    let client = new WebSocket(`${process.env.REACT_APP_BACKEND_WS_URL}`);

    client.addEventListener('message', message_log_show);

    return () => {
      client.removeEventListener('message', message_log_show);
    }
  }, [message_log_show]);  

  return <Provider store={store}>
    <BrowserRouter>
      <HeaderListStore/>
      <Body/>
    </BrowserRouter>
  </Provider>
}

export default App;
