import React from 'react';

export default class WelcomeTitle extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="bienvenida">
            <h1>Bienvenido</h1>
            <p>
              {this.props.userName}
            </p>
        </div>
      </div>
    );
  }
}
