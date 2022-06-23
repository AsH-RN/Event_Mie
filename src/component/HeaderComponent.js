/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_menu from '../assets/icon/ic_menu.png';
import ic_back from '../assets/icon/ic_back.png';
import ic_man from '../assets/icon/ic_man.png';

// User Preference
import {async_keys, getData} from '../api/UserPreference';

const HeaderComponent = props => {
  // const [count, setCount] = useState(0);
  // const [addItemCount, setAddItemCount] = useState(0);

  const {nav, title, navAction} = props;

  const toggleDrawer = () => {
    nav.openDrawer();
  };

  const handleBack = async () => {
    // const id = await getData(async_keys.bloodDonationPatientId);

    // if (title === 'Public Donor') {
    //   if (id === null) {
    //     nav.navigate('PatientLogin');
    //     return;
    //   } else {
    //     nav.navigate('TabView');
    //   }
    // }
    nav.pop();
  };

  let navIcon = ic_menu;
  let handleNavAction = toggleDrawer;

  if (navAction === 'back') {
    navIcon = ic_back;
    handleNavAction = handleBack;
  }

  //   const handleCart = () => {
  //     nav.navigate('Cart');
  //   };

  const handleChange = event => {};

  const handleProfile = async () => {
    // getting token from AsyncStorage
    const token = await getData(async_keys.userId);

    if (token === null) {
      nav.navigate('Login');
    } else {
      nav.navigate('Profile');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={handleNavAction}
        style={styles.menuIconContainer}>
        <Image source={navIcon} resizeMode="cover" style={styles.backIcon} />
      </TouchableOpacity>

      <Text
        style={styles.headerTitle}
        value={props.value}
        onChange={handleChange}>
        {title}
      </Text>

      <TouchableOpacity
        onPress={handleProfile}
        activeOpacity={1}
        style={styles.notificationIconContainer}>
        <Image
          source={ic_man}
          resizeMode="cover"
          style={styles.cartIconStyle}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={handleCart}
        activeOpacity={1}
        style={styles.notificationIconContainer}>
        <Image
          source={ic_header_cart}
          resizeMode="cover"
          style={styles.cartIconStyle}
        />

        <View style={styles.cartContainer}>
          <Text style={styles.cartCountText} onChange={handleChange}>
            {props.value}
          </Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
  },
  menuIconContainer: {
    padding: wp(2),
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
  },
  cartIconStyle: {
    width: wp(8),
    height: wp(8),
  },
  headerTitle: {
    color: '#000',
    fontSize: wp(4.4),
    marginLeft: wp(1.2),
  },
  cartContainer: {
    position: 'absolute',
    top: hp(0.5),
    left: wp(7),
    backgroundColor: 'red',
    borderRadius: wp(10),
    height: hp(2),
    width: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontSize: wp(2.5),
    color: '#fff',
    textAlign: 'center',
  },
  notificationIconContainer: {
    marginLeft: 'auto',
    padding: wp(2),
  },
  notificationIcon: {
    width: wp(5.6),
    height: wp(5.6),
  },
  notificationBadgeContainer: {
    width: wp(3.3),
    height: wp(3.3),
    backgroundColor: 'red',
    borderRadius: wp(1.7),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: wp(2),
    left: wp(2),
  },
  notificationBadge: {
    color: '#fff',
    fontSize: wp(2.2),
    textAlign: 'center',
  },
});
