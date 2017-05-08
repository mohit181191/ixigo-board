/**
 * Created by mohitgupta on 05/05/17.
 */

import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import Card from '../Card/Card';
import { DropTarget } from 'react-dnd';
import {findDOMNode} from 'react-dom';

const CARD_TOP = 48;// header at the top

const getNewCardIndex = (positionY, scrollY, cardHeight) => {
  // shift placeholder if y position more than card height / 2
  const yPos = positionY - CARD_TOP + scrollY;
  let newCardIndex;
  if (yPos < cardHeight / 2) {
    newCardIndex = -1; // place at the start
  } else {
    newCardIndex = Math.floor((yPos - cardHeight / 2) / ( cardHeight ));
  }
  return newCardIndex;
}
const dropTarget = {
  drop(props, monitor, component) {
    const lastCardIndex = monitor.getItem().cardIndex;
    const lastColumnIndex = monitor.getItem().columnIndex;
    const newColumnIndex = props.columnIndex;
    const newCardIndex = getNewCardIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop,
      monitor.getItem().cardHeight);

    props.onCardDrop(lastColumnIndex, lastCardIndex, newColumnIndex, newCardIndex);
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget('CARD', dropTarget, collect)
class Column extends Component {
  static propTypes = {
    widgets: PropTypes.array,
  };

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editColumnMode: false,
    }
  }

  onEditList = () => {
    this.setState({
      editColumnMode: !this.state.editColumnMode
    })
  }

  onSaveColumnName = () => {
    const content = this.refs.listName.value;
    this.props.onSaveColumnName(this.props.columnIndex, content);
    this.setState({
      editColumnMode: false
    });
  }

  onDeleteColumn = () => {
    const {props} = this;
    props.onDeleteColumn(props.columnIndex);
  }

  addCard = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  onSaveCard = () => {
    const value = this.refs.emptyCard.value;
    this.props.onSaveCard(this.props.columnIndex, value);
    this.setState({
      isEditing: false
    })
  }

  onCancelCard = () => {
    this.setState({
      isEditing: false
    })
  }

  render() {
    const { connectDropTarget, column, columnIndex, onSaveCard, onDeleteCard} = this.props;
    const s = require('./Column.scss');
    return connectDropTarget(
      <div className={s.columnContainer}>
        {this.state.editColumnMode ?
          <div className={s.editList}>
            <input className={s.editListInput} defaultValue={column.name} ref="listName"/>
            <div>
              <button onClick={this.onSaveColumnName}>Done</button>
              <button onClick={this.onDeleteColumn}>Delete</button>
            </div>
          </div> :
          <div className={s.columnHeader} onClick={this.onEditList}>
            <div className={s.columnName}>{column.name}</div>
            <div>
              <button onClick={this.onDeleteColumn}>Delete</button>
            </div>
          </div>}
        <div className={ s.cardContainer}>
          {column.cards.map((card, cardIndex) =>(
            <Card
              card={card}
              cardIndex={cardIndex}
              columnIndex={columnIndex}
              onSaveCard={onSaveCard}
              onDeleteCard={onDeleteCard}
            />))}
          {this.state.isEditing ?
            <div className={s.cardBody}>
              <textarea className={s.emptyCardContent} ref="emptyCard"/>
              <div className={s.emptyCardFooter}>
                <button onClick={this.onCancelCard}>Cancel</button>
                <button onClick={this.onSaveCard}>Add</button>
              </div>
            </div> :
            <div className={s.emptyCard} onClick={this.addCard}>
              Add a card
            </div>}
        </div>
      </div>
    )
  }
}

export default Column;