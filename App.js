import { StyleSheet, Text, View } from 'react-native';
import {colors} from './src/constants';
import LoginScreen from './src/screens/LoginScreen';


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
