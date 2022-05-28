/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_login from '../assets/icon/ic_login.png';
import facebook from '../assets/icon/facebook.png';
import google from '../assets/icon/google.png';

// Image
import splash_image from '../assets/image/spalsh_image.png';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleNameChange = name => {
    this.setState({name});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleLogin = async () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={splash_image}>
        <View style={styles.homeContainer}>
          <Text style={styles.loginTextStyle}>Register</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.loginFormTextInput}
              placeholder="Name"
              placeholderTextColor="#c4c3cb"
              keyboardType="default"
              underlineColorAndroid="transparent"
              value={this.state.name}
              onChangeText={this.handleNameChange}
              InputProps={{disableUnderline: true}}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.loginFormTextInput}
              placeholder="Email"
              placeholderTextColor="#c4c3cb"
              keyboardType="default"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={this.handlePasswordChange}
              InputProps={{disableUnderline: true}}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.loginFormTextInput}
              placeholder="Password"
              placeholderTextColor="#c4c3cb"
              keyboardType="default"
              underlineColorAndroid="transparent"
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              InputProps={{disableUnderline: true}}
            />
          </View>

          <Text style={styles.agreeTextStyle}>
            By clicking "Register", I accept the{' '}
            <Text style={{color: '#1b89ef'}}>Terms of Service</Text> and have
            read the <Text style={{color: '#1b89ef'}}>Privacy Policy</Text>.{' '}
            {'\n'} I agree that bookingqube may share my information with event
            organizers.
          </Text>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleLogin}>
            <Image
              source={ic_login}
              resizeMode="cover"
              style={styles.loginIconStyle}
            />
            <Text style={styles.loginButtonTextStyle}>Register</Text>
          </TouchableOpacity>

          <View style={styles.forgetAndRegisterContainer}>
            <Text style={styles.additionalTextStyle}>
              Already Have An Account?
            </Text>

            <Text style={styles.additionalTextStyle} onPress={this.handleLogin}>
              Login
            </Text>
          </View>

          <View style={styles.lineContainer}></View>

          <View style={styles.socialMediaContainer}>
            <Text style={styles.socialTextStyle}>Or Continue with</Text>
            <View style={styles.socialLoginContainer}>
              <View style={styles.facebookViewContainer}>
                <Image
                  source={facebook}
                  resizeMode="cover"
                  style={styles.socialMediaIconStyle}
                />

                <Text style={styles.facebookTextStyle}>Facebook</Text>
              </View>

              <View style={styles.googleViewContainer}>
                <Image
                  source={google}
                  resizeMode="cover"
                  style={styles.socialMediaIconStyle}
                />

                <Text style={styles.facebookTextStyle1}>Google</Text>
              </View>
            </View>
          </View>
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
    padding: wp(3),
  },
  loginTextStyle: {
    fontSize: wp(8),
    fontWeight: '700',
    color: '#fff',
    marginVertical: hp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: wp(2),
    marginVertical: hp(1),
  },
  loginFormTextInput: {
    fontSize: wp(3.5),
    flex: 1,
    // marginLeft: wp(4),
    backgroundColor: '#334759',
    borderRadius: wp(1),
  },
  agreeTextStyle: {
    fontSize: wp(3.7),
    fontWeight: '700',
    color: '#fff',
    marginTop: hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(95),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: wp(3),
    marginVertical: hp(4),
  },
  loginIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
  },
  loginButtonTextStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#1b89ef',
    marginLeft: wp(2),
  },
  forgetAndRegisterContainer: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  additionalTextStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  lineContainer: {
    height: hp(0.1),
    width: wp(90),
    backgroundColor: '#fff',
    marginVertical: hp(4),
  },
  socialMediaContainer: {},
  socialTextStyle: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left',
    marginBottom: hp(2),
  },
  socialLoginContainer: {
    flexDirection: 'row',
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  facebookViewContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#fff',
    marginTop: hp(1),
  },
  googleViewContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#fff',
    marginTop: hp(1),
  },
  socialMediaIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
  },
  facebookTextStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#1b89ef',
  },
  facebookTextStyle1: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#1b89ef',
    marginLeft: wp(2),
  },
});
