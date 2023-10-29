import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import {colors} from './src/constants';
import LoginScreen from './src/screens/LoginScreen';
import ExploreScreen from './src/screens/LoginScreen';
import MainProfile from './src/screens/MainProfile';



export default function App() {

    const OnBoardingStack = createNativeStackNavigator();
    const BottomTabs = createBottomTabNavigator();

    const OnboardingStackScreens=(navigation, route)=>{
        return(
            <OnBoardingStack.Navigator initialRouteName='OnBoard'>
                <OnBoardingStack.Screen name="OnBoard" component={LoginScreen}/>
                <OnBoardingStack.Screen name="Explore" component={ExploreScreen}/>
                <OnBoardingStack.Screen name="Profile" component={MainProfile}/>
            </OnBoardingStack.Navigator>

        );
    }


    return (
        <View style={{flex:1}}>
          <LoginScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});
