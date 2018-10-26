import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';

// Define type of property
interface Props {}

export class OnlineStatus extends React.Component<Props> {
  // Set default properties
  static defaultProps = {};

  getOnlineStatus() {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
  }

  state = {
    online: this.getOnlineStatus(),
  };

  updateOnlineStatus() {
    this.setState({
      online: this.getOnlineStatus(),
    });
  }

  componentDidMount() {
    console.log(navigator);
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus.bind(this));
    window.removeEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    children: {
      type: ControlType.Array,
      title: 'Content',
      propertyControl: {
        type: ControlType.ComponentInstance,
        title: 'Page',
      },
    },
  };

  render() {
    if (this.props.children.length == 0) {
      return (
        <div
          style={{
            border: '1px dashed #ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100%',
            color: '#ddd',
            textAlign: 'center',
            padding: 16,
          }}
        >
          Connect to a frame to be online state
        </div>
      );
    }
    return <div>{this.state.online ? this.props.children[0] : this.props.children[1]}</div>;
  }
}
