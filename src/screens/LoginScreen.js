import { useState } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, Alert} from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const LoginScreen = ({route, navigation}) => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [message, setMessage]=useState(' ');

    const pressLogin = async() => {
        if(username==''){
            setMessage("Error: Please enter username");
            return;
        }
        const response = await getUser(username);
        if(response.status==500){
            setMessage("Error: This account does not exist");
        }else if(response.status>=200 || response.status<300){
            const this_password=(await response.json()).password;
            if(this_password==password){
                navigation.navigate({
                    name:"UserScreen",
                    params: { account_username: username },
                });
            }else{
                setMessage("Error: Wrong password");
            }
        }else{
            setMessage("Error code: "+response.status);
        }
    };

    const pressRegister = async() => {
        if(username.length<4 || username.length>12){
            setMessage("Error: Username must be 4 to 12 digits long");
            return;
        }
        if(password.length<8 || password.length>12){
            setMessage("Error: Password must be 8 to 12 digits long");
            return;
        }
        const response = await getUser(username);
        if(response.status==500){
            const post_response=await createUser(username, password);
            if(post_response.status>=200 || post_response.status<300){
                setMessage("Successful Registration");
            }
        }else if(response.status>=200 || response.status<300){
            setMessage("Error: This account already exists");
        }else{
            setMessage("Error code: "+response.status);
        }

    };

    return(
        <View style={styles.container} onPress={Keyboard.dismiss}>
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
                    <View style={styles.textbox_container}>
                        <Text style={fonts.message}>{message}</Text>
                    </View>
                </View>
                <View style={styles.buttons_container}>
                    <View style={styles.button}>
                        <AppButton id="login-button" title="LOGIN" onPress={pressLogin}/>
                    </View>
                    <View style={[styles.button]}>
                        <AppButton id="register-button" title="REGISTER" onPress={pressRegister}/>
                    </View>
                </View>
            </View>
        </View>
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
