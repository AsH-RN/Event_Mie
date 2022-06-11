/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Icon
import ic_home from '../assets/icon/ic_home.png';
import ic_footer_category from '../assets/icon/ic_footer_category.png';
import ic_footer_event from '../assets/icon/ic_footer_event.png';
import ic_footer_login from '../assets/icon/ic_footer_login.png';

// User Preference
import {async_keys, getData} from '../api/UserPreference';

export default class FooterComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHome = () => {
    this.props.nav.navigate('Home');
  };

  handleEvent = async () => {
    this.props.nav.navigate('EventList');
  };

  handleCategory = () => {
    this.props.nav.navigate('MyBooking');
  };

  handleLogin = async () => {
    // getting token from AsyncStorage
    const token = await getData(async_keys.userId);

    if (token === null) {
      this.props.nav.navigate('Login');
    } else {
      this.props.nav.navigate('Profile');
    }
  };

  handleScanTicket = () => {
    this.props.nav.navigate('ScanTicket');
  };

  render() {
    const {tab} = this.props;
    const selectedTabStyle = [styles.footerMenu, {backgroundColor: '#ECEFFF'}];

    return (
      <SafeAreaView
        style={[
          this.state.checkDarkMode === 1
            ? styles.footerContainerBlack
            : styles.footerContainer,
        ]}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleHome}
          style={tab === 'Home' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image source={ic_home} style={styles.footerNavigatorIcon} />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Home
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleCategory}
          style={tab === 'Game' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image
              source={ic_footer_category}
              style={styles.footerNavigatorIcon}
            />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              My Bookings
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleEvent}
          style={tab === 'Profile' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image
              source={ic_footer_event}
              style={styles.footerNavigatorIcon}
            />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Event
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleLogin}
          style={tab === 'EventList' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image
              source={ic_footer_login}
              style={styles.footerNavigatorIcon}
            />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Login
            </Text>
          </View>
        </TouchableHighlight>

        {/* <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleScanTicket}
          style={tab === 'ScanTicket' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image source={ic_home} style={styles.footerNavigatorIcon} />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Scan Ticket
            </Text>
          </View>
        </TouchableHighlight> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    height: hp(8),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f2f1f1',
  },
  footerContainerBlack: {
    height: hp(8),
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#121212',
  },
  footerMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleMenu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerNavigatorIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  footerMenuText: {
    fontSize: wp(3),
    color: '#000',
    fontWeight: '700',
  },
  footerMenuTextBlack: {
    fontSize: wp(3),
    color: '#fff',
  },
});
