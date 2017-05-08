import * as types from './types';
import Lockr from 'lockr';
export const fetchColumns = () => {
  return {
    type: types.FETCH_SUCCESS,
  }
};

export const saveList = (value) => {
  return {
    type: types.SAVE_LIST,
    payload: value
  }
}
export const saveCard = (columnIndex, cardIndex, content) => {
  return {
    type: types.SAVE_CARD,
    payload: { columnIndex, cardIndex, content }
  }
}
export const onDeleteCard = (columnIndex, cardIndex) => {
  return {
    type: types.DELETE_CARD,
    payload: { columnIndex, cardIndex }
  }
}
export const onCardDrop = (currentColumnIndex, currentCardIndex, newColumnIndex, newCardIndex) => {
  return {
    type: types.ON_CARD_DROP,
    payload: { currentColumnIndex, currentCardIndex, newColumnIndex, newCardIndex }
  }
}
export const onDeleteColumn = (columnIndex) => {
  return {
    type: types.ON_DELETE_COLUMN,
    payload: columnIndex
  }
}
export const onSaveColumnName = (columnIndex, content) => {
  return {
    type: types.ON_SAVE_LIST_NAME,
    payload: { columnIndex, content }
  }
}