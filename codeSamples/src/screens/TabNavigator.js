import * as React from 'react';
import {Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlusIconComp from '../components/PlusIconComponent/PlusIconComp';
import {
  DashboardScreen,
  HomeScreen,
  CommunityScreen,
  ProfileScreen,
} from '../features';
import images from '../constants/images';
import {dimens} from '../constants/dimens';
import font from '../constants/font';

export const bottomTabIdentifier = {
  home_screen: 'HOME_SCREEN',
  dashboard_screen: 'DASHBOARD_SCREEN',
  community_screen: 'COMMUNITY_SCREEN',
  profile_screen: 'PROFILE_SCREEN',
};

function PlusButtonComponent() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>PlusButtonComponent!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {colors} = useTheme();
  const activeColor = colors.red;
  const inactiveColor = colors.white;

  const getTabBarIcon = (routeName, focused) => {
    let iconName;

    if (routeName === bottomTabIdentifier.home_screen) {
      if (focused) {
        iconName = colors.white ? images.home : images.home;
      } else {
        iconName = images.home;
      }
    } else if (routeName === bottomTabIdentifier.dashboard_screen) {
      iconName = colors.white ? images.dashboard : images.dashboard;
    } else if (routeName === bottomTabIdentifier.community_screen) {
      iconName = colors.white ? images.community : images.community;
    } else if (routeName === bottomTabIdentifier.profile_screen) {
      iconName = colors.white ? images.profile : images.profile;
    }

    return (
      <Image
        source={iconName}
        style={{
          width: 32,
          height: 32,
          tintColor: focused ? activeColor : inactiveColor,
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: colors.black60,
          height: dimens.h11,
          // bottom: Platform.OS === 'ios' ? 0 : 12,
        },
      }}>
      <Tab.Screen
        name={bottomTabIdentifier.home_screen}
        component={HomeScreen}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: font.Body1_Inter_Regular,
            bottom: Platform.OS === 'ios' ? 0 : 12,
          },
          tabBarIcon: ({focused}) => getTabBarIcon(route.name, focused),
        })}
      />
      <Tab.Screen
        name={bottomTabIdentifier.dashboard_screen}
        component={DashboardScreen}
        options={({route}) => ({
          tabBarLabel: 'Dashboard',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: font.Body1_Inter_Regular,
            bottom: Platform.OS === 'ios' ? 0 : 12,
          },
          tabBarIcon: ({focused}) => getTabBarIcon(route.name, focused),
        })}
      />
      <Tab.Screen
        name="PlusButtonComponent"
        component={PlusButtonComponent}
        options={{
          tabBarButton: () => <PlusIconComp />,
        }}
      />
      <Tab.Screen
        name={bottomTabIdentifier.community_screen}
        component={CommunityScreen}
        options={({route}) => ({
          tabBarLabel: 'Community',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: font.Body1_Inter_Regular,
            bottom: Platform.OS === 'ios' ? 0 : 12,
          },
          tabBarIcon: ({focused}) => getTabBarIcon(route.name, focused),
        })}
      />
      <Tab.Screen
        name={bottomTabIdentifier.profile_screen}
        component={ProfileScreen}
        options={({route}) => ({
          tabBarLabel: 'You',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: font.Body1_Inter_Regular,
            bottom: Platform.OS === 'ios' ? 0 : 12,
          },
          tabBarIcon: ({focused}) => getTabBarIcon(route.name, focused),
        })}
      />
    </Tab.Navigator>
  );
}
