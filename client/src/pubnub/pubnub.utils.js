import PubNub from "pubnub";

export default class PubNubHelper {
  channel = "postman-local";
  channels = [this.channel];
  constructor(uuid) {
    this.pubnub = new PubNub({
      publishKey: "pub-c-4144ff7c-97f8-4963-af18-7682af62041c",
      subscribeKey: "sub-c-2507dd7e-71d3-11ea-a7c4-5e95b827fd71",
      uuid: uuid
    });
  }

  subscribeInitiater() {
    this.pubnub.subscribe({
      channels: this.channels,
      withPresence: true
    });
  }

  checkHereNow() {
    return new Promise((resolve, reject) => {
      this.pubnub.hereNow(
        {
          channels: this.channels,
          includeUUIDs: true
        },
        (status, response) => {
          if (status.error) {
            reject({ status, response });
          } else if (response && response.totalOccupancy) {
            resolve(response.channels[this.channel].occupants);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  addListenerHelper(listenerProp) {
    this.pubnub.addListener(listenerProp);
  }

  unsubscribeHelper() {
    this.pubnub.unsubscribe({
      channels: this.channels
    });
  }
}
