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
  Keyboard,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Component
import ProcessingLoader from '../component/ProcessingLoader';
import {showToast} from '../component/CustomToast';
import HeaderComponent from '../component/HeaderComponent';

// Icon
import ic_login from '../assets/icon/ic_login.png';
import facebook from '../assets/icon/facebook.png';
import google from '../assets/icon/google.png';

// Image
import splash_image from '../assets/image/spalsh_image.png';

// API
import {BASE_URL, makeRequest} from '../api/ApiInfo';

// User Preference
import {async_keys, storeData} from '../api/UserPreference';

// Validation
import {isEmailAddress} from '../validation/FormValidator';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showProcessingLoader: false,
    };
  }

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleRegister = async () => {
    this.props.navigation.navigate('SignUp');
  };

  handleForgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword');
  };

  handleLogin = async () => {
    Keyboard.dismiss();

    const {email, password} = this.state;

    // validation
    if (!isEmailAddress(email)) {
      Alert.alert('', 'Please enter email!', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (password.trim() === '') {
      Alert.alert('', 'Please enter valid password!', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    try {
      // starting processing loader
      this.setState({showProcessingLoader: true});

      // preparing params
      const params = {
        email: email,
        password: password,
        device_name: 'android',
      };

      // calling api
      const response = await makeRequest(BASE_URL + 'login', params, true);

      if (response) {
        const {success, errors, token} = response;

        if (success === true) {
          // stopping processing loader
          this.setState({showProcessingLoader: false});

          console.log(response.data.id);

          await storeData(async_keys.userId, token);
          await storeData(async_keys.userInfo, response.data.id);

          this.props.navigation.push('Home');
        } else {
          const {username} = errors;

          // stopping processing loader
          this.setState({showProcessingLoader: false});

          if (errors.username) {
            showToast(username[0]);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={splash_image}>
        <HeaderComponent
          title="Login"
          navAction="back"
          nav={this.props.navigation}
        />
        <View style={styles.homeContainer}>
          <Text style={styles.loginTextStyle}>Login</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.loginFormTextInput}
              placeholder="Email"
              placeholderTextColor="#c4c3cb"
              keyboardType="default"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={this.handleEmailChange}
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

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleLogin}>
            <Image
              source={ic_login}
              resizeMode="cover"
              style={styles.loginIconStyle}
            />
            <Text style={styles.loginButtonTextStyle}>Login</Text>
          </TouchableOpacity>

          <View style={styles.forgetAndRegisterContainer}>
            <Text
              style={styles.additionalTextStyle}
              onPress={this.handleForgetPassword}>
              Forgot Password?
            </Text>

            <Text
              style={styles.additionalTextStyle}
              onPress={this.handleRegister}>
              Register
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

                <Text style={styles.facebookTextStyle}>Google</Text>
              </View>
            </View>
          </View>
        </View>

        {this.state.showProcessingLoader && <ProcessingLoader />}
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
