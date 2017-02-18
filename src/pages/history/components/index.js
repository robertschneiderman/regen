import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

export class History extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="history">
        Page Content: History
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
