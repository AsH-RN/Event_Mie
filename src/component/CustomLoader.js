/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export class CustomLoader extends Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(30, 120);
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          style={{height: 150, aspectRatio: 1 / 1}}
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../assets/image/88146-event-venue.json')}
          autoPlay
          loop
        />
        <Text>Loading</Text>
      </View>
    );
  }
}

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
