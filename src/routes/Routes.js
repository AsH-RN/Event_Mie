/* eslint-disable prettier/prettier */
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Screens
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import ForgetPasswordScreen from '../screen/ForgetPasswordScreen';

// Home Screen
import HomeScreen from '../screen/HomeScreen';

// Event Screen
import EventListScreen from '../screen/EventListScreen';
import ViewEventScreen from '../screen/ViewEventScreen';

// Category Screen
import CategoryScreen from '../screen/CategoryScreen';

// Scan Ticket Screen
import ScanTicketScreen from '../screen/ScanTicketScreen';

// Profile Screen
import ProfileScreen from '../screen/ProfileScreen';

// MyBooking Screen
import MyBookingScreen from '../screen/MyBookingScreen';
import CheckoutScreen from '../screen/CheckOutScreen';
import AttendeeScreen from '../screen/AttendeeScreen';
import SeatingChartScreen from '../screen/SeatingChartScreen';

const AdminNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgetPassword: ForgetPasswordScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const LoggedOutNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    EventList: EventListScreen,
    ViewEvent: ViewEventScreen,
    ScanTicket: ScanTicketScreen,
    Category: CategoryScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgetPassword: ForgetPasswordScreen,
    Profile: ProfileScreen,
    MyBooking: MyBookingScreen,
    SeatingChart: SeatingChartScreen,
    Checkout: CheckoutScreen,
    Attendee: AttendeeScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const EventListingNavigator = createStackNavigator(
  {
    EventList: EventListScreen,
    ViewEvent: ViewEventScreen,
  },
  {
    initialRouteName: 'EventList',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const MyBookingNavigator = createStackNavigator(
  {
    MyBooking: MyBookingScreen,
    SeatingChart: SeatingChartScreen,
    Checkout: CheckoutScreen,
    Attendee: AttendeeScreen,
  },
  {
    initialRouteName: 'MyBooking',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

// export const createRootNavigator = () => {
//   const ROUTES = {
//     Home: {
//       screen: HomeScreen,
//       // navigationOptions: setDrawerItemIcon(ic_drawer_home),
//     },
//     Login: {
//       screen: AdminNavigator,
//       // navigationOptions: setDrawerItemIcon(ic_drawer_notification),
//     },
//     Profile: {
//       screen: ProfileNavigator,
//       // navigationOptions: setDrawerItemIcon(ic_drawer_fair_and_event),
//     },
//     'Browse Event': {
//       screen: EventListingNavigator,
//       // navigationOptions: setDrawerItemIcon(ic_drawer_members),
//     },
//     'My Booking': {
//       screen: MyBookingNavigator,
//       // navigationOptions: setDrawerItemIcon(ic_drawer_vendors),
//     },
//   };

//   const navigatorConfig = {
//     initialRouteName: 'Home',
//     unmountInactiveRoutes: true,
//     // contentComponent: CustomDrawerContentComponent,
//   };

//   return createDrawerNavigator(ROUTES, navigatorConfig);
// };

export const createRootNavigator = isLoggedIn => {
  const ROUTES = {
    LoggedOut: LoggedOutNavigator,
    LoggedIn: AdminNavigator,
  };

  let initialRouteName = 'LoggedOut';

  if (isLoggedIn) {
    initialRouteName = 'LoggedIn';
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};
