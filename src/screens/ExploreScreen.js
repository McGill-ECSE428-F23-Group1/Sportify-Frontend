import { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, Alert} from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const ExploreScreen = (route, navigation) => {
    console.log(route);

    return(
        <View style={styles.container}>
            <View style={{flex: 1, backgroundColor: 'blue'}} />
            <View style={{flex: 2, backgroundColor: 'white'}} />
            <View style={{flex: 3, backgroundColor: 'yellow'}} />
        </View>
    );
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
        },
    })

export default ExploreScreen;
