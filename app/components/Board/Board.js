/**
 * Created by mohitgupta on 05/05/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Column from '../Column/Column';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const COLUMN_WIDTH = 270;
const BUFFER_WIDTH = 16; // 8+8 margin
const getContainerWidth = (columns) => ((columns.length + 1) * (COLUMN_WIDTH + BUFFER_WIDTH));

@DragDropContext(HTML5Backend)
class Columns extends Component {
  static propTypes = {
    widgets: PropTypes.array,
  };

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  addList = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onSaveList = () => {
    const value = this.refs.addList.value;
    this.props.saveList(value);
  }

  onCancelList = () => {
    this.setState({
      isEditing: false
    })
  }

  onSaveCard = (columnIndex, content, cardIndex) => {
    this.props.saveCard(columnIndex, cardIndex, content)
  }

  render() {
    const {columns, onCardDrop, onDeleteCard, onDeleteColumn, onSaveColumnName} = this.props;
    const containerWidth = getContainerWidth(columns);
    const s = require('./Board.scss');
    return (
      <div className={s.boardContainer}>
        <div className={s.boardHeader}>Trello Board</div>
        <div className={s.columnsContainer} style={{width:containerWidth}}>
          {columns.map((column, columnIndex) => (
            <Column
              column={column}
              columnIndex={columnIndex}
              onCardDrop={onCardDrop}
              onSaveCard={this.onSaveCard}
              onCardDrop={onCardDrop}
              onDeleteCard={onDeleteCard}
              onDeleteColumn={onDeleteColumn}
              onSaveColumnName={onSaveColumnName}
            />))}

          <div className={s.addListContainer}>
            {this.state.isEditing ?
              <div>
                <input ref="addList" className={s.addListInput}/>
                <div className={s.addListFooter}>
                  <button onClick={this.onCancelList}>Cancel</button>
                  <button onClick={this.onSaveList}>Add</button>
                </div>
              </div> : <div className={s.addList} onClick={this.addList}>Add List</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Columns;