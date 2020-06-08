import * as TYPES from './constants';
import {API} from '../../config';

import {
  requestCharacters,
  receiveCharacters,
  handleCharactersError,
} from './actions';

const initialState = {
  error: null,
  request: false,
  data: [],
  metaData: null,
  sortBy: 'lowToHigh',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_CHARACTERS:
      return {
        ...state,
        request: true,
      };
    case TYPES.RECEIVE_CHARACTERS:
      return {
        ...state,
        metaData: action.payload && action.payload.info,
        data: action.payload && action.payload.results,
        request: false,
        error: false,
      };
    case TYPES.REQUEST_CHARACTERS_ERROR:
      return {
        ...state,
        error: true,
        request: false,
      };
    case TYPES.UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export const fetchCharacters = customURL => (dispatch, getState) => {
  let defaultURL = API.BASE_URL;
  dispatch(requestCharacters());
  try {
    return fetch(customURL || defaultURL)
      .then(response => response.json())
      .then(response => {
        if (response) {
          dispatch(receiveCharacters(response));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(handleCharactersError(error));
      });
  } catch (error) {
    console.log(error);
    dispatch(handleCharactersError(error));
  }
};
