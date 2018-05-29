import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';

export default class ImageModerator extends React.Component {
    render() {
        return <App config={this.props.config} />;
    }
}

ReactDOM.render(
    <ImageModerator {...{config: window.props}} />,
    document.getElementById('app-container')
);
