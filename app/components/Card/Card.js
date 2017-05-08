/**
 * Created by mohitgupta on 05/05/17.
 */

import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import {findDOMNode} from 'react-dom';

const cardSource = {
  beginDrag(props, monitor, component) {
    const elem = findDOMNode(component);
    return {
      id: props.card.id,
      cardIndex: props.cardIndex,//card index
      columnIndex: props.columnIndex,
      cardHeight: elem.clientHeight,
    };
  }
};

@DragSource('CARD', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    onSaveCard: PropTypes.func,
    onDeleteCard: PropTypes.func,
    columnIndex: PropTypes.number,
    cardIndex: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  onEditCardBody = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  onCancelCard = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  onDeleteCard = () => {
    const {columnIndex , cardIndex} = this.props;
    this.props.onDeleteCard(columnIndex, cardIndex);
  };

  onSaveCard = () => {
    const {columnIndex , cardIndex} = this.props;
    const value = this.refs.cardContent.value;
    this.props.onSaveCard(columnIndex, value, cardIndex);
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  render() {
    const { isDragging, connectDragSource , card} = this.props;
    const {isEditing} = this.state;
    const s = require('./Card.scss');
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {isEditing ?
          <div className={s.cardContainer}>
            <div className={s.cardBody}>
              <textarea defaultValue={card.content} ref="cardContent" className={s.cardTextArea}/>
              <div className={s.emptyCardFooter}>
                <button onClick={this.onDeleteCard}>Delete</button>
                <button onClick={this.onCancelCard}>Cancel</button>
                <button onClick={this.onSaveCard}>Edit</button>
              </div>
            </div>
          </div> :
          <div className={s.cardContainer} onClick={this.onEditCardBody}>
            <div className={s.cardBody}>
              {card.content}
            </div>
          </div>}
      </div>)
  }
}
export default Card;

