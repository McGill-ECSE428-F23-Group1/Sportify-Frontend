import { StyleSheet, Text, View } from 'react-native';
import {colors} from './src/constants';
import LoginScreen from './src/screens/LoginScreen';
import MainProfile from './src/screens/MainProfile';


export default function App() {
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
