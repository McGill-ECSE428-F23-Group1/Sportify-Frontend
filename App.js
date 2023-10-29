import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import {colors} from './src/constants';
import LoginScreen from './src/screens/LoginScreen';
import MainProfile from './src/screens/MainProfile';
import FriendsScreen from './src/screens/FriendsScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ChatScreen from './src/screens/ChatScreen';
import UserScreen from './src/screens/UserScreen';


export default function App() {

    const OnBoardingStack = createNativeStackNavigator();
    const BottomTabs = createBottomTabNavigator();

    const UserScreens=()=>{
        return (
          <BottomTabs.Navigator initialRouteName="Explore">
            <BottomTabs.Screen name="Explore" component={ExploreScreen}/>
            <BottomTabs.Screen name="Friends" component={FriendsScreen} />
            <BottomTabs.Screen name="Chat" component={ChatScreen} />
            <BottomTabs.Screen name="Profile" component={MainProfile} />
          </BottomTabs.Navigator>
        );
      }

    return (
        <View style={{flex:1}}>
            <NavigationContainer>
                <OnBoardingStack.Navigator initialRouteName='OnBoard'>
                    <OnBoardingStack.Screen name="OnBoard" component={LoginScreen} options={{ headerShown: false }}/>
                    <OnBoardingStack.Screen name="UserScreen" component={UserScreen}  options={{ headerShown: false }}/>
                </OnBoardingStack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});
