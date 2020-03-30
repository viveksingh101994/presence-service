import React, { Component } from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { post } from "../../axios/axios.utiils";
import { url } from "../../global.config";
import { PresenceComponent } from "../../components/presence/presence.component";

export default class DashBoardComponent extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    debugger;
    this.pubnub = new PubNub({
      publishKey: "pub-c-4144ff7c-97f8-4963-af18-7682af62041c",
      subscribeKey: "sub-c-2507dd7e-71d3-11ea-a7c4-5e95b827fd71",
      uuid: user.uid
    });

    this.state = {
      users: [user]
    };
  }

  channels = ["test-room5"];
  checkHereNow = () => {
    this.pubnub.hereNow(
      {
        channels: this.channels,
        includeUUIDs: true
      },
      async (status, response) => {
        if (
          response &&
          response.totalOccupancy &&
          response.totalOccupancy > 1
        ) {
          const { user } = this.props;
          const otherUsers = response.channels["test-room5"].occupants
            .filter(x => x.uuid !== user.uid)
            .map(x => x.uuid);
          const rooms = await post(`${url}/api/v1/room-user`, {
            users: otherUsers
          });
          this.setState({
            users: rooms.data
          });
        }
        // handle status, response
      }
    );
  };

  componentWillMount() {
    this.pubnub.subscribe({
      channels: this.channels,
      withPresence: true
    });

    this.pubnub.addListener({
      presence: this.checkHereNow
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: this.channels
    });
  }

  render() {
    const { users } = this.state;
    return (
      <PubNubProvider client={this.pubnub}>
        <PresenceComponent users={users} />
      </PubNubProvider>
    );
  }
}
