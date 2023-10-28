import { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, Alert} from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const LoginScreen = () => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    const pressLogin = () => {
        if(true){
            //if account does not exist
            loginUsernameError();
            return;
        }
        if(true){
            //if wrong password
            loginPasswordError();
            return;
        }
        //then do the login and navigation
    };

    const pressRegister = async() => {
        if(username.length<4 || username.length>12){
            registrationUsernameError();
            return;
        }
        if(password.length<8 || password.length>12){
            registrationPasswordError();
            return;
        }
        console.log("REGISTER "+username+"-"+password);
        const response = await getUser(username);
        console.log(response);
        //get user
        //if doesnot exist, then allow registration
    };

    const registrationUsernameError = () =>{
        Alert.alert(
            'Invalid Username', 
            'Username must be 4 to 12 digits long', 
            [{text: 'OK'},]
        );
    }

    const registrationPasswordError = () =>{
        Alert.alert(
            'Invalid Password', 
            'Password must be 8 to 12 digits long', 
            [{text: 'OK'},]
        );
    }

    const registrationSuccessful = () =>{
        Alert.alert(
            'Successful Registration', 
            '', 
            [{text: 'OK'},]
        );
    }

    const registrationFailed = () =>{
        Alert.alert(
            'Registeration Failed', 
            '', 
            [{text: 'OK'},]
        );
    }

    const loginUsernameError = () =>{
        Alert.alert(
            'Invalid Username', 
            'This account does not exist', 
            [{text: 'OK'},]
        );
    }

    const loginPasswordError = () =>{
        Alert.alert(
            'Wrong Password', 
            '', 
            [{text: 'OK'},]
        );
    }

    const loginSuccessful = () =>{
        //navigation
    }

    const loginFailed = () =>{
        Alert.alert(
            'Login Failed', 
            '', 
            [{text: 'OK'},]
        );
    }

    return(
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                                id="username-text-input"
                                style={[fonts.textbox_input, {flex:1, marginHorizontal:4, marginTop:1}]}
                                onChangeText={onChangeUsername}
                                value={username}
                                placeholder={"4 to 12 characters"}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                spellCheck={false}
                                maxLength={12}
                            />
                        </View>
                    </View>
                    <View style={styles.textbox_container}>
                        <View style={styles.textbox_title_container}>
                            <Text style={fonts.textbox_title}>PASSWORD</Text>
                        </View>
                        <View style={styles.textbox_content_container}>
                            <TextInput 
                                id="password-text-input"
                                style={[fonts.textbox_input, {flex:1, marginHorizontal:4, marginTop:1}]}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder={"8 to 12 characters"}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                spellCheck={false}
                                maxLength={12}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttons_container}>
                    <View style={styles.button}>
                        <AppButton id="login-button" title="LOGIN" onPress={()=>{console.log("LOGIN "+username+"-"+password)}}/>
                    </View>
                    <View style={[styles.button]}>
                        <AppButton id="register-button" title="REGISTER" onPress={pressRegister}/>
                    </View>
                </View>
            </View>
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
