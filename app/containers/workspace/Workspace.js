import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Board from '../../components/Board/Board';

class Workspace extends PureComponent {
  static propTypes = {
    lists: PropTypes.array,
    fetchColumns: PropTypes.func,
    loading: PropTypes.bool,
  };

  componentWillMount() {
    this.props.fetchColumns();
  }

  render() {
    const styles = require('./Workspace.scss');
    if (!this.props.loaded) {
      return (
        <div className={styles.listContainer}>
          Loading
        </div>)
    }
    return (
      <Board
        {...this.props}
        {...this.state}
      />);
  }
}
const mapStateToProps = (state) => {
  return {
    columns: state.board.columns,
    loaded: state.board.loaded
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(Workspace);