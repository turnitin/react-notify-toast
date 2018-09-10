import React from 'react';
import PropTypes from 'prop-types';
import { getDefaults, mergeOptions } from '../defaults';

/* Export notification container */
export default class extends React.Component {
    static propTypes = {
      // eslint-disable-next-line
      options: PropTypes.object,
    };

    static defaultProps = {
      options: {},
    }

    componentWillMount() {
      mergeOptions(this.props.options);
    }

    render() {
      return (
        <div id={getDefaults().wrapperId} />
      );
    }
}
