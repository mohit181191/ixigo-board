import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import _ from 'lodash';
import Lockr from 'lockr';

const board = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS:
      const columns = Lockr.get('columns') || []
      return {
        ...state,
        columns: columns,
        loaded: true
      }
    case types.FETCH_LOADING:
      return {
        ...state,
        loaded: false
      }
    case types.SAVE_LIST:
      if (state.columns) {
        const newColumns = [...state.columns];
        newColumns.push({
          id: _.uniqueId('100'),
          name: action.payload,
          cards: []
        })
        Lockr.set('columns', newColumns);
        return {
          ...state,
          columns: newColumns
        }
      } else {
        const columns = [{
          id: _.uniqueId('100'),
          name: action.payload,
          cards: []
        }]
        Lockr.set('columns', columns);
        return {
          ...state,
          columns
        }
      }
    case types.SAVE_CARD:
    {
      const { columnIndex, cardIndex, content } = action.payload;
      const stateCols = [...state.columns];
      const cards = stateCols[columnIndex].cards;
      if (_.get(cards, `${cardIndex}`)) {
        cards[cardIndex].content = content;
      } else {
        cards.push({
          id: _.uniqueId('card_'),
          content
        })
      }
      Lockr.set('columns', stateCols);
      return {
        ...state,
        columns: stateCols
      }
    }
    case types.DELETE_CARD:
    {
      const _stateColumns = [...state.columns];
      const { columnIndex, cardIndex } = action.payload;
      _stateColumns[columnIndex].cards.splice(cardIndex, 1);
      Lockr.set('columns', _stateColumns);
      return {
        ...state,
        columns: _stateColumns
      }
    }
    case types.ON_CARD_DROP:
    {
      const _columns = [...state.columns];
      const { currentColumnIndex, currentCardIndex, newColumnIndex, newCardIndex } = action.payload;
      if (currentColumnIndex === newColumnIndex) {
        _columns[currentColumnIndex].cards.splice(newCardIndex, 0, _columns[currentColumnIndex].cards.splice(currentCardIndex, 1)[0]);
      } else {
        // move element to new place
        _columns[newColumnIndex].cards.splice(newCardIndex, 0, _columns[currentColumnIndex].cards[currentCardIndex]);
        // delete element from old place
        _columns[currentColumnIndex].cards.splice(currentCardIndex, 1);
      }
      Lockr.set('columns', _columns);
      return {
        ...state,
        columns: _columns
      };
    }
    case types.ON_DELETE_COLUMN:
    {
      const columnIndex = action.payload;
      const _columns = [...state.columns];
      _columns.splice(columnIndex, 1);
      Lockr.set('columns', _columns);
      return {
        ...state,
        columns: _columns
      }
    }
    case types.ON_SAVE_LIST_NAME:
    {
      const {columnIndex,content} = action.payload;
      const _columns = [...state.columns];
      _columns[columnIndex].name = content;
      Lockr.set('columns', _columns);
      return {
        ...state,
        columns: _columns
      }
    }
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  board,
  routing
});

export default rootReducer;
