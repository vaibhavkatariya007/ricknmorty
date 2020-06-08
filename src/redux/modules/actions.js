import * as TYPES from './constants';

export const updateSortBy = sortby => ({
  type: TYPES.UPDATE_SORT_BY,
  payload: sortby,
});

export const requestCharacters = () => ({
  type: TYPES.REQUEST_CHARACTERS,
});

export const receiveCharacters = data => ({
  type: TYPES.RECEIVE_CHARACTERS,
  payload: data,
});

export const handleCharactersError = error => ({
  type: TYPES.REQUEST_CHARACTERS_ERROR,
  payload: error,
});
