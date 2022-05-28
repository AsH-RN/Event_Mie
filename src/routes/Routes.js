/* eslint-disable prettier/prettier */
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Screens
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';

// Home Screen
import HomeScreen from '../screen/HomeScreen';

const LoggedOutNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    // SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const HomeNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const LoggedInNavigator = createSwitchNavigator(
  {Home: HomeNavigator},
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export const createRootNavigator = isLoggedIn => {
  const ROUTES = {
    LoggedOut: LoggedOutNavigator,
    LoggedIn: LoggedInNavigator,
  };

  let initialRouteName = 'LoggedOut';

  if (isLoggedIn) {
    initialRouteName = 'LoggedIn';
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};
