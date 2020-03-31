import React, { Component } from "react";
import { PubNubProvider } from "pubnub-react";
import PresenceComponent from "../presence/presence.component";
import PubNubHelper from "../../pubnub/pubnub.utils";
import {
  getPresentUsersStart,
  setInitialUser
} from "../../redux/presence/presence.actions";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

class AvatarComponent extends Component {
  constructor(props) {
    super(props);
    this.props.setUserList(this.props.currentUser);
    this.initPubnubServices();
  }
  checkHereNow = async () => {
    try {
      const {
        currentUser: { user },
        roomUserList
      } = this.props;
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

  initPubnubServices() {
    const {
      currentUser: { user }
    } = this.props;
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
    return (
      <PubNubProvider client={this.pubnub}>
        <PresenceComponent />
      </PubNubProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserList: user => dispatch(setInitialUser(user)),
  roomUserList: userList => dispatch(getPresentUsersStart(userList))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent);
