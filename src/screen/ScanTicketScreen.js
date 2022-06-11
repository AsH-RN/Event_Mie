/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Component
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon
import ic_header_home_icon from '../assets/icon/ic_header_home_icon.png';
import ic_categories from '../assets/icon/ic_categories.png';
import ic_camera from '../assets/icon/ic_camera.png';

// Image
import header_image from '../assets/image/header_image.png';

export default class ScanTicketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent title="Scan Ticket" nav={this.props.navigation} />

        <View style={styles.homeContainer}>
          <ImageBackground
            source={header_image}
            resizeMode="cover"
            style={styles.headerImageStyle}>
            <Text style={styles.titleText}>EVENTS</Text>
            <View style={styles.eventHeadlineContainer}>
              <Image
                source={ic_header_home_icon}
                resizeMode="cover"
                style={styles.IconStyle}
              />

              <Text style={styles.slashText}>/</Text>
              <Text style={styles.eventText}>Scan Ticket</Text>
            </View>
          </ImageBackground>

          <View style={styles.scanTicketContainer}>
            <Image
              source={ic_categories}
              resizeMode="cover"
              style={styles.categoryIconStyle}
            />

            <Text style={styles.scanTextStyle}>Scan Ticket</Text>
          </View>

          <View style={styles.cameraScanContainer}>
            <Image
              source={ic_camera}
              resizeMode="cover"
              style={styles.categoryIconStyle}
            />

            <Text style={styles.cameraTextStyle}>Camera not detected!</Text>
          </View>
        </View>

        <FooterComponent nav={this.props.navigation} />
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
  scanTicketContainer: {
    height: hp(6),
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: hp(2),
    marginHorizontal: wp(4),
    backgroundColor: '#d9edf7',
    paddingVertical: hp(2),
  },
  categoryIconStyle: {
    width: wp(5),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  scanTextStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#3d4b62',
    textAlign: 'center',
    marginLeft: wp(2),
  },
  cameraScanContainer: {
    height: hp(6),
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: hp(2),
    marginHorizontal: wp(4),
    backgroundColor: '#f2dede',
    paddingVertical: hp(2),
  },
  cameraTextStyle: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#a94546',
    textAlign: 'center',
    marginLeft: wp(2),
  },
});
