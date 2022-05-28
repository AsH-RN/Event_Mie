/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Image
import logo from '../assets/image/logo.png';
import splash_image from '../assets/image/spalsh_image.png';

export default class SplashScreen extends Component {
  CText = props => <Text style={{color: props.color}}>{props.children}</Text>;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.handleText();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  handleText = async () => {
    // do nothing
    this.forceUpdate();
  };

  render() {
    // let contentString = '';
    let initialArr = [
      {
        id: 1,
        text: 'Event Mie',
      },
    ];
    // let index = [1, 3, 5];
    // const CText = this.CText;
    var backColor = [
      '#c36a2d',
      '#afa939',
      '#60204b',
      '#ca3e47',
      '#f7b71d',
      '#f36886',
      '#614ad3',
      '#0c99c1',
      '#4e3440',
      '#fff',
    ];
    const rand = Math.floor(Math.random() * 9) + 1;

    return (
      <ImageBackground style={styles.container} source={splash_image}>
        <View style={styles.homeContainer}>
          <Text style={styles.logoTextStyle}>
            {initialArr.map(item => (
              <Text onPress={this.handleText} style={{color: backColor[rand]}}>
                {item.text}
              </Text>
            ))}
          </Text>
          <Image source={logo} resizeMode="cover" style={styles.logoStyle} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00192f',
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    height: hp(15),
    aspectRatio: 31 / 32,
  },
  logoTextStyle: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#fff',
    marginRight: wp(4),
  },
});
