import { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, Alert} from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const ExploreScreen = () => {


    return(
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>

        </TouchableWithoutFeedback>
    );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.light_blue,
        },
    })

export default ExploreScreen;
