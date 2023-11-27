import React from 'react';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '../constants';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';


const IndividualChatScreen = () => {
  const route = useRoute();
  const {username} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>{username}</Text>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  topBanner: {
    backgroundColor: colors.blue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default IndividualChatScreen;
