import React, { Component } from "react";
import { PubNubProvider } from "pubnub-react";
import PresenceComponent from "../../components/presence/presence.component";
import PubNubHelper from "../../pubnub/pubnub.utils";
import {
  getPresentUsersStart,
  setInitialUser
} from "../../redux/presence/presence.actions";
import { connect } from "react-redux";

class AvatarComponent extends Component {
  checkHereNow = async () => {
    try {
      const { user, roomUserList } = this.props;
      const occupants = await this.pubnub.checkHereNow();
      if (occupants) {
        const userList = occupants
          .filter(x => x.uuid !== user.uid)
          .map(x => x.uuid);
        roomUserList(userList);
      }
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  componentWillMount() {
    this.props.setUserList(this.props);
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
    if (this.pubnub) this.pubnub.unsubscribeHelper();
  }

  render() {
    console.log(this.props.user);
    return (
      <PubNubProvider client={this.pubnub}>
        <PresenceComponent user={this.props.user} />
      </PubNubProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserList: user => dispatch(setInitialUser(user)),
  roomUserList: userList => dispatch(getPresentUsersStart(userList))
});

export default connect(null, mapDispatchToProps)(AvatarComponent);
