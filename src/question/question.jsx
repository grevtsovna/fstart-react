import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Question extends PureComponent {
  propTypes = {
    questionData: PropTypes.object.isRequired
  };

  render() {
    const { questionData } = this.props;
    return (<div>{questionData.de}</div>);
  }
}

export default Question;
