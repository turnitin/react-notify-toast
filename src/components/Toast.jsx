import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { getDefaults } from '../defaults';
import stylesheet from '../stylesheet';

/* React Notification Component */
class Toast extends React.Component {
    static propTypes = {
      text: PropTypes.oneOfType([
        PropTypes.string, PropTypes.element,
      ]).isRequired,
      timeout: PropTypes.number,
      type: PropTypes.string.isRequired,
      color: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
      ]),
    };

    static defaultProps = {
      timeout: getDefaults().timeout,
      color: getDefaults().colors.success,
    }

    state = {
      containerStyle: stylesheet.styles.container,
    };

    componentDidMount() {
      this.animateState();
    }
    getToastStyle() {
      const { type, color } = this.props;
      const { styles } = stylesheet;
      let contentStyle = {};

      /* If type is set, merge toast action styles with base */
      switch (type) {
        case 'success':
        case 'error':
        case 'warning':
        case 'info':
          contentStyle = assign({}, styles.content, getDefaults().colors[type]);
          break;
        case 'custom': {
          const customStyle = {
            backgroundColor: color.background,
            color: color.text,
          };
          contentStyle = assign({}, styles.content, customStyle);
          break;
        }
        default:
          contentStyle = assign({}, styles.content);
          break;
      }

      return contentStyle;
    }

    animateState() {
      const { styles } = stylesheet;

      // Show
      setTimeout(() => {
        this.updateStyle(styles.show);
      }, 100); // wait 100ms after the component is called to animate toast.

      // Timeout -1 displays toast as a persistent notification
      if (this.props.timeout === -1) {
        return;
      }

      // Hide after timeout
      setTimeout(() => {
        this.updateStyle(styles.hide);
      }, this.props.timeout);
    }

    // Updates the style of the container with styles for a state (hide/show).
    // This triggers animations.
    updateStyle(stateStyle) {
      const { styles } = stylesheet;

      this.setState({ containerStyle: assign({}, styles.container, stateStyle) });
    }


    render() {
      const { text } = this.props;
      const { containerStyle } = this.state;

      return (
        <div className="toast-notification" style={containerStyle}>
          <span style={this.getToastStyle()}>
            {text}
          </span>
        </div>
      );
    }
}

export default Toast;
