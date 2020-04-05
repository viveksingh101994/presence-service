import React, { Component } from 'react';
import PresenceComponent from '../presence/presence.component';
import './avatar.styles.scss';
import { Paper } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import { url } from '../../global.config';

class AvatarComponent extends Component {
  constructor(props) {
    super(props);
    const socket = socketIOClient(url);
    this.state = {
      users: []
    };
    socket.on('roomUsers', (roomMembers) => {
      this.setState(
        {
          users: roomMembers.users
        },
        console.log(this.state)
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.users.length > 0 ? (
          <Paper elevation={3} className="paper-container">
            <div>
              <h1>Active Users</h1>
              <div className="avatar-container">
                <PresenceComponent userList={this.state.users} />
              </div>
            </div>
          </Paper>
        ) : null}
      </React.Fragment>
    );
  }
}

export default AvatarComponent;
