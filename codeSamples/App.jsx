import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {
  SplashScreen,
  Intro_CommunitySafetyScreen,
  Intro_CrimeScreen,
  Intro_RealTimeScreen,
  SignupScreen,
  ForgotPasswordScreen,
  SignInScreen,
  AnonymousSignInScreen,
  ReSetPasswordScreen,
  VideoScreenComp,
  EventDetailsScreen,
  CommentsAddReplyScreens,
  ReportCrimeScreen,
  StatisticsFilterScreen,
  CrimeLocationMapScreen,
} from './src/screens';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';
import TabNavigator from './src/screens/TabNavigator';
import GoogleAutocomplete from './src/features/GoogleAutocomplete';

export const commonStackIdentifier = {
  splash_screen: 'SPLASH_SCREEN',
  intro_communitySafetyScreen: 'INTRO_COMMON_SECURITY_SCREEN',
  intro_crimescreen: 'INTRO_CRIME_SCREEN',
  intro_realtimescreen: 'INTRO_REALTIME_SCREEN',
  signup_screen: 'SIGNUP_SCREEN',
  forgot_password: 'FORGOT_PASSWORD',
  signin_screen: 'SIGNIN_SCREEN',
  anonymous_screen: 'ANONYMOUS_SCREEN',
  reset_password: 'RESET_PASSWORD_SCREEN',
  tab_navigator: 'TAB_NAVIGATOR',
  drawer_navigatore: 'DRAWER_NAVIGATOR',
  event_details: 'EVENT_DETAILS',
  video_screen: 'VIDEO_SCREEN',
  drawer_navigatore_home: 'DRAWER_NAVIGATOR_HOME',
  comments_add_reply: 'COMMENTS_ADD_REPLY',
  google_autocomplete: 'GOOGLE_AUTOCOMPLETE',
  report_crime_screen: 'REPORT_CRIME_SCREEN',
  statistics_filter: 'STATISTICS_FILTER',
  crime_location_map: 'CRIME_LOCATION_MAP',
};

const App = () => {
  const Stack = createStackNavigator();

  const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer theme={MyThemeColors}>
          <Stack.Navigator
            screenOptions={TransitionScreenOptions}
            initialRouteName={commonStackIdentifier.splash_screen}>
            <Stack.Screen
              name={commonStackIdentifier.splash_screen}
              options={{headerShown: false}}
              component={SplashScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.intro_communitySafetyScreen}
              options={{headerShown: false}}
              component={Intro_CommunitySafetyScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.intro_crimescreen}
              options={{headerShown: false}}
              component={Intro_CrimeScreen}
              screenOptions={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name={commonStackIdentifier.intro_realtimescreen}
              options={{headerShown: false}}
              component={Intro_RealTimeScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.signup_screen}
              options={{headerShown: false}}
              component={SignupScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.forgot_password}
              options={{headerShown: false}}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.signin_screen}
              options={{headerShown: false}}
              component={SignInScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.anonymous_screen}
              options={{headerShown: false}}
              component={AnonymousSignInScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.reset_password}
              options={{headerShown: false}}
              component={ReSetPasswordScreen}
            />
            <Stack.Screen
              name={commonStackIdentifier.google_autocomplete}
              options={{headerShown: false}}
              component={GoogleAutocomplete}
            />
            <Stack.Screen
              name={commonStackIdentifier.report_crime_screen}
              options={{headerShown: false}}
              component={ReportCrimeScreen}
            />
            {/* <Stack.Screen
              name={commonStackIdentifier.tab_navigator}
              options={{headerShown: false}}
              component={TabNavigator}
            /> */}
            <Stack.Screen
              name={commonStackIdentifier.drawer_navigatore}
              options={{headerShown: false}}
              component={DrawerNavigator}
            />
            <Stack.Screen
              // options={{
              //   headerShown: false,
              //   presentation: 'modal',
              //   gestureEnabled: true,
              //   cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              // }}
              options={{headerShown: false}}
              name={commonStackIdentifier.video_screen}
              component={VideoScreenComp}
            />

            <Stack.Screen
              name={commonStackIdentifier.event_details}
              options={{headerShown: false}}
              component={EventDetailsScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                presentation: 'modal',
                gestureEnabled: false,
                // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
              name={commonStackIdentifier.comments_add_reply}
              // options={{headerShown: false}}
              component={CommentsAddReplyScreens}
            />

            <Stack.Screen
              name={commonStackIdentifier.statistics_filter}
              options={{headerShown: false}}
              component={StatisticsFilterScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                presentation: 'modal',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
              name={commonStackIdentifier.crime_location_map}
              component={CrimeLocationMapScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: '#fff'},
      }}>
      <Drawer.Screen
        name={commonStackIdentifier.tab_navigator}
        options={{title: 'HomeDrawer'}}
        component={TabNavigator}
      />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default App;

const MyThemeColors = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    black10: '#F4F4F4',
    black20: '#D8D8D8',
    black30: '#969696',
    black40: '#646464',
    black50: '#323232',
    black60: '#121212',
    black70: '#1B1B1E',
    lightGray: '#717171',
    red: '#DA1A35',
    singleLine: '#D0D5DD',
    red_onPredd: 'rgba(218,26,53, 0.5)',
    boxShadow: 'rgba(218, 26, 53, 0.24)',
    disabledRed: '#da1a3580',
    redplusone: '#C10F28',
    redminusone: '#DD5769',
    green: '#41D33E',
    warningorange: '#FF8B00',
    infoblue: '#1BA2E8',
    locationblue: '#1A89DA',
    backgroundblue: '#F1F9FF',
    infoyellow: '#F6DC41',
    badgeYellow: '#F6D71D',
    lightBlue: '#D7F1FF',
  },
};
