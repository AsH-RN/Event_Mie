/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Share,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Icon
import ic_home from '../assets/icon/ic_home.png';
// import ic_share from '../assets/icons/ic_share.png';
// import ic_man from '../assets/icons/ic_man.png';
// import ic_game from '../assets/icons/ic_game.png';
// import ic_mail_support from '../assets/icons/ic_mail_support.png';

export default class FooterComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHome = () => {
    this.props.nav.navigate('Home');
  };

  // handleShare = async () => {
  //   try {
  //     await Share.share({
  //       title: 'Share me',
  //       message:
  //         'https://play.google.com/store/apps/details?id=com.GunjanPackage.gunjangroup',
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // handleProfile = () => {
  //   this.props.nav.navigate('Profile');
  // };

  // handleGame = () => {
  //   this.props.nav.navigate('GameHome');
  // };

  // handleSupport = () => {
  //   this.props.nav.navigate('Contact');
  // };

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
          onPress={this.handleGame}
          style={tab === 'Game' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image source={ic_home} style={styles.footerNavigatorIcon} />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Category
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleProfile}
          style={tab === 'Profile' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image source={ic_home} style={styles.footerNavigatorIcon} />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Profile
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleShare}
          style={tab === 'Cart' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image source={ic_home} style={styles.footerNavigatorIcon} />
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

        {/* <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleSupport}
          style={tab === 'Blood' ? selectedTabStyle : styles.footerMenu}>
          <View style={styles.singleMenu}>
            <Image
              source={ic_mail_support}
              style={styles.footerNavigatorIcon}
            />
            <Text
              style={[
                this.state.checkDarkMode === 1
                  ? styles.footerMenuTextBlack
                  : styles.footerMenuText,
              ]}>
              Support
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
