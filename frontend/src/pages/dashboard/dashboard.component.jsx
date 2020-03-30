import React, { Component } from "react";
import { PubNubProvider } from "pubnub-react";
import { post } from "../../axios/axios.utiils";
import { url } from "../../global.config";
import PresenceComponent from "../../components/presence/presence.component";
import PubNubHelper from "../../pubnub/pubnub.utils";

export default class DashBoardComponent extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      users: [user]
    };
  }

  checkHereNow = async () => {
    try {
      const { user } = this.props;
      const occupants = await this.pubnub.checkHereNow();
      const userList = occupants
        .filter(x => x.uuid !== user.uid)
        .map(x => x.uuid);
      const rooms = await post(`${url}/api/v1/room-user`, {
        users: userList
      });
      this.setState({
        users: rooms.data
      });
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  componentWillMount() {
    this.initPubnubServices();
  }

  initPubnubServices() {
    const { user } = this.props;
    this.pubnub = new PubNubHelper(user.uid);
    this.pubnub.subscribeInitiater();
    this.pubnub.addListenerHelper({
      presence: this.checkHereNow
    });
    this.checkHereNow();
  }

  componentWillUnmount() {
    this.pubnub.unsubscribeHelper();
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
