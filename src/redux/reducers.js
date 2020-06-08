import {combineReducers} from 'redux';

import charactersReducer from './modules/characters';

const appReducer = combineReducers({
  characters: charactersReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
