import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import createRootReducer from './reducers/Root';
import { entitiesInitializer } from './reducers/Referential';

// Default application state
const initialState = {
  app: Immutable({
    logged: JSON.parse(localStorage.getItem('logged')),
    worker: { status: 'RUNNING' },
  }),
  screen: Immutable({ navbar_left_open: false, navbar_right_open: true }),
  referential: entitiesInitializer,
};

export const history = createBrowserHistory();

const logger = createLogger({
  predicate: (getState, action) => !action.type.startsWith('DATA_FETCH')
        && !action.type.startsWith('@@redux-form'),
});

const initStore = () => {
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    return createStore(
      createRootReducer(history),
      initialState,
      compose(
        applyMiddleware(routerMiddleware(history), thunk, logger),
        window.devToolsExtension && window.devToolsExtension(),
      ),
    );
  }
  return createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(routerMiddleware(history), thunk),
  );
};

export const store = initStore();
