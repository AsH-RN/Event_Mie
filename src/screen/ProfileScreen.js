/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';

// Component
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';
import CustomLoader from '../component/CustomLoader';
import ProcessingLoader from '../component/ProcessingLoader';

// Icon
import ic_header_home_icon from '../assets/icon/ic_header_home_icon.png';
import ic_man from '../assets/icon/ic_man.png';

// Image
import header_image from '../assets/image/header_image.png';

// API Info
import {BASE_URL, makeRequest} from '../api/ApiInfo';

// User Preference
import {async_keys, getData} from '../api/UserPreference';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      name: '',
      email: '',
      address: '',
      phone: '',
      taxpayerNumber: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      isLoading: true,
      showProcessingLoader: false,
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    const axios = require('axios');

    // getting id from async storage
    const token = await getData(async_keys.userId);

    try {
      // calling api
      await axios
        .get(BASE_URL + 'profile', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        // processing response
        .then(response => {
          let newResponse = response;

          if (newResponse) {
            const {success, data} = newResponse.data;

            if (success === true) {
              this.setState({
                name: data.name,
                email: data.email,
                address: data.address,
                phone: data.phone,
                taxpayerNumber: data.taxpayer_number,
                selectedFile: data.avatar,
                isLoading: false,
              });
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleNameChange = name => {
    this.setState({name});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handleAddressChange = address => {
    this.setState({address});
  };

  handlePhoneChange = phone => {
    this.setState({phone});
  };

  handleTaxpayerNumberChange = taxpayerNumber => {
    this.setState({taxpayerNumber});
  };

  handleCurrentPasswordChange = currentPassword => {
    this.setState({currentPassword});
  };

  handleNewPasswordChange = newPassword => {
    this.setState({newPassword});
  };

  handleConfirmPasswordChange = confirmPassword => {
    this.setState({confirmPassword});
  };

  handlePermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            break;
          case RESULTS.GRANTED:
            // console.log("The permission is granted");
            this.handleFilePick();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert(
              'Permission Blocked',
              'Press OK and provide "Storage" permission in App Setting',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: this.handleOpenSettings,
                },
              ],
              {cancelable: false},
            );
        }
      } else if (Platform.OS === 'ios') {
        this.handleFilePick();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleFilePick = async () => {
    try {
      // Pick a single file
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      this.setState({selectedFile: response});
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('cannot open settings', error);
    }
  };

  handleUpdateProfile = async () => {
    Keyboard.dismiss();

    // getting token from AsyncStorage
    const {
      name,
      email,
      address,
      phone,
      taxpayerNumber,
      currentPassword,
      newPassword,
      confirmPassword,
      selectedFile,
    } = this.state;

    try {
      // params.file = selectedFile;
      // starting processing loader
      // this.setState({showProcessingLoader: true});

      // preparing params
      let params = {
        name: name,
        email: email,
        current: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
        address: address,
        phone: phone,
        taxpayer_number: taxpayerNumber,
        // profile_image: params.file
        // profile_image: selectedFile,
      };

      // calling api
      const response = await makeRequest(
        BASE_URL + 'profile/update',
        params,
        true,
      );

      if (response) {
        const {success} = response;

        if (success === true) {
          // starting processing loader
          this.setState({showProcessingLoader: false});

          this.forceUpdate();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <CustomLoader />;
    }

    const url = 'https://devdemo.shrigenesis.com/events_app/storage/';
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          title="Profile"
          navAction="back"
          nav={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.homeContainer}>
            <ImageBackground
              source={header_image}
              resizeMode="cover"
              style={styles.headerImageStyle}>
              <Text style={styles.titleText}>PROFILE</Text>
              <View style={styles.eventHeadlineContainer}>
                <Image
                  source={ic_header_home_icon}
                  resizeMode="cover"
                  style={styles.IconStyle}
                />

                <Text style={styles.slashText}>/</Text>
                <Text style={styles.eventText}>PROFILE</Text>
              </View>
            </ImageBackground>

            <View style={styles.profileAvatarContainer}>
              {this.state.selectedFile === null ? (
                <Image
                  source={ic_man}
                  resizeMode="cover"
                  style={styles.profileAvatarIcon}
                />
              ) : (
                <Image
                  source={{uri: url + this.state.selectedFile}}
                  resizeMode="cover"
                  style={styles.profileAvatarIcon1}
                />
              )}
            </View>

            <Text style={styles.textInputText}>Avatar*</Text>
            <View style={styles.inputContainer}>
              <Text onPress={this.handleFilePick}>Choose Avatar</Text>
            </View>

            <Text style={styles.textInputText}>Name*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.name}
                onChangeText={this.handleNameChange}
              />
            </View>

            <Text style={styles.textInputText}>Email*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.email}
                onChangeText={this.handleEmailChange}
              />
            </View>

            <Text style={styles.textInputText}>Address*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Address"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.address}
                onChangeText={this.handleAddressChange}
              />
            </View>

            <Text style={styles.textInputText}>Phone*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.phone}
                onChangeText={this.handlePhoneChange}
              />
            </View>

            <Text style={styles.textInputText}>Taxpayer Number*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Taxpayer Number"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.taxpayerNumber}
                onChangeText={this.handleTaxpayerNumberChange}
              />
            </View>

            <Text style={styles.textInputText}>Current Password*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Current Password"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.currentPassword}
                onChangeText={this.handleCurrentPasswordChange}
              />
            </View>

            <Text style={styles.textInputText}>New Password*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="New Password"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.newPassword}
                onChangeText={this.handleNewPasswordChange}
              />
            </View>

            <Text style={styles.textInputText}>Confirm Password*</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#000"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.confirmPassword}
                onChangeText={this.handleConfirmPasswordChange}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleUpdateProfile}>
              <Text style={styles.saveProfileText}>Save Profile</Text>
            </TouchableOpacity>

            <Text style={styles.hostText}>Want to create & host events ?</Text>

            <TouchableOpacity style={styles.hostButtonContainer}>
              <Text style={styles.saveProfileText}>Become Organizer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <FooterComponent nav={this.props.navigation} />

        {this.state.showProcessingLoader && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  homeContainer: {
    flex: 1,
  },
  headerImageStyle: {
    height: hp(20),
    width: 'auto',
    backgroundColor: '#00192f',
  },
  titleText: {
    position: 'absolute',
    top: hp(10),
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  eventHeadlineContainer: {
    position: 'absolute',
    top: hp(14),
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: wp(6),
    backgroundColor: '#1b89ef',
    marginHorizontal: wp(4),
  },
  IconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginHorizontal: wp(0.8),
    marginLeft: wp(2),
  },
  slashText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(0.8),
  },
  eventText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#c9c9c9',
    marginHorizontal: wp(0.8),
  },
  profileAvatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  profileAvatarIcon: {
    height: hp(14),
    aspectRatio: 1 / 1,
  },
  profileAvatarIcon1: {
    height: hp(14),
    aspectRatio: 1 / 1,
    borderRadius: wp(20),
  },
  textInputText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#5e5f5f',
    marginVertical: hp(1),
    marginTop: hp(2),
    marginHorizontal: wp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: wp(2),
    // marginVertical: hp(1),
    marginHorizontal: wp(4),
  },
  loginFormTextInput: {
    fontSize: wp(3.5),
    flex: 1,
    // marginLeft: wp(4),
    // backgroundColor: '#334759',
    borderRadius: wp(1),
    color: '#000',
  },
  buttonContainer: {
    height: hp(6),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: wp(4),
    backgroundColor: '#1b89ef',
  },
  saveProfileText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  hostText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#838383',
    marginHorizontal: wp(4),
    marginVertical: hp(1),
  },
  hostButtonContainer: {
    height: hp(6),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: wp(4),
    backgroundColor: '#00192f',
  },
});
