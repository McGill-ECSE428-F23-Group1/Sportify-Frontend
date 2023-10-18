import { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, SafeAreaView} from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';


const LoginScreen = () => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
  

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}></View>
                <View style={styles.title_container}>
                    <Text style={fonts.app_title}>SPORTIFY</Text>
                </View>
                <View style={styles.textboxes_container}>
                <View style={[styles.textbox_container,{marginTop: 16}]}>
                        <View style={styles.textbox_title_container}>
                            <Text style={fonts.textbox_title}>USERNAME</Text>
                        </View>
                        <View style={styles.textbox_content_container}>
                            <TextInput 
                                style={[fonts.textbox_input, {flex:1, marginHorizontal:4, marginTop:1}]}
                                onChangeText={onChangeUsername}
                                value={username}
                                placeholder={"4 to 12 characters"}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                spellCheck={false}
                            />
                        </View>
                    </View>
                    <View style={styles.textbox_container}>
                        <View style={styles.textbox_title_container}>
                            <Text style={fonts.textbox_title}>PASSWORD</Text>
                        </View>
                        <View style={styles.textbox_content_container}>
                            <TextInput 
                                style={[fonts.textbox_input, {flex:1, marginHorizontal:4, marginTop:1}]}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder={"8 to 12 characters"}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                spellCheck={false}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttons_container}>
                    <View style={styles.button}>
                        <AppButton title="LOGIN" onPress={()=>{console.log("LOGIN "+username+"-"+password)}}/>
                    </View>
                    <View style={[styles.button]}>
                        <AppButton title="REGISTER" onPress={()=>{console.log("REGISTER "+username+"-"+password)}}/>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.light_blue,
        },
        title_container: {
            flex: 3.5,
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        textboxes_container: {
            flex: 2.5,
            flexDirection: 'column',
        },
        textbox_container: {
            flexDirection: 'row',
            marginTop: 6,
            marginHorizontal: 18,
            height: 26,
        },
        textbox_title_container: {
            flex: 3.7,
            flexDirection: 'row',
            alignItems: 'center',
        },
        textbox_content_container: {
            flex: 6.3,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
        },
        buttons_container: {
            flex: 3,
            flexDirection: 'column',
        },
        button: {
            height: 36,
            marginHorizontal: 18,
            marginTop: 6,
        },
})

export default LoginScreen;
