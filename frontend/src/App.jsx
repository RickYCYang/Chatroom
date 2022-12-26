/* redux */
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

/* Local components */
import Router from './components/router';

/* utils */
import 'assets/style/App.scss';

const store = configureStore({});

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
