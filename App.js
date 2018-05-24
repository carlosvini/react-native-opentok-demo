import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, View } from 'react-native';

import OpenTok, { Publisher, Subscriber } from "react-native-opentok"; // eslint-disable-line

import type { Ref } from 'react';

const sessionId = '<SESSION_ID>';
const token = '<TOKEN>';

export default class App extends Component<{}> {
  /* $FlowFixMe we ignore the fact that componentWillMount shouldn't be async. Just for example purposes */
  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  ref: Ref<typeof Publisher>;

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={async () => {
            const isSent = await OpenTok.sendSignal(sessionId, 'message', 'a');
            console.log(isSent);
          }}
          title="Send signal 2"
        />

        <Button
          onPress={() => {
            if (typeof this.ref !== 'string') this.ref.switchCamera();
          }}
          title="Switch camera"
        />

        <Subscriber
          sessionId={sessionId}
          style={{ height: 300, width: 400, backgroundColor: 'black' }}
        />
        <Publisher
          sessionId={sessionId}
          style={{ height: 300, width: 400, backgroundColor: 'black' }}
          ref={ref => {
            /* $FlowFixMe */
            this.ref = ref;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => App);
