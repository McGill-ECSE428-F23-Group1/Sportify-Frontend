import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import { colors, fonts } from '../constants';
import MainProfile from './MainProfile';
import FriendsScreen from './FriendsScreen';
import ExploreScreen from './ExploreScreen';
import ChatScreen from './ChatScreen';
import IndividualChatScreen from './IndividualChatScreen';

import { getUser } from '../../features/steps/utils';


const UserScreen = ({ route, navigation }) => {

    const [username, setUsername] = useState('');
    const [chatFriendUsername, setChatFriendUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [friends, setFriends] = useState([]);

    const [message, setMessage] = useState(' ');
    const [stage, setStage] = useState("Explore");

    useEffect(() => {
        setUsername(route.params.account_username);
        const updateData = async () => {
            const response = await getUser(route.params.account_username);
            const response_json = await response.json();
            const response_code = response.status;
            if ((response).status >= 200 || (response).status < 300) {
                setPassword(response_json.password);
                setGender(response_json.gender);
                setEmail(response_json.email);
                setAddress(response_json.address);
                setFriends(response_json.friends);
            } else {
                setMessage("Error code: " + response_code);
            }
        }
        updateData();
    }, [route.params.account_username]);

    const setStageToExplore = () => {
        setStage("Explore");
    }

    const setStageToFriends = () => {
        setStage("Friends");
    }

    const setStageToChat = () => {
        setStage("Chat");
    }

    const setStageToIndividualChat = () => {
        setStage("IndividualChat");
    }

    const setStageToProfile = () => {
        setStage("Profile");
    }

    const logout = () => {
        navigation.pop();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, marginBottom: 36, display: stage == "Explore" ? "flex" : "none" }} >
                <ExploreScreen
                    route={route} navigation={navigation}
                    accountUsername={username}
                />
            </View>
            <View style={{ flex: 1, marginBottom: 36, display: stage == "Friends" ? "flex" : "none" }} >
                <FriendsScreen accountUsername={username} />
            </View>
            <View style={{ flex: 1, marginBottom: 36, display: stage == "Chat" ? "flex" : "none" }} >
                <ChatScreen
                    accountUsername={username}
                    setFriendUsername={setChatFriendUsername}
                    navigateToIndividualChat={setStageToIndividualChat}
                />
            </View>
            <View style={{ flex: 1, marginBottom: 36, display: stage == "IndividualChat" ? "flex" : "none" }} >
                <IndividualChatScreen accountUsername={username} friendUsername={chatFriendUsername} />
            </View>
            <View style={{ flex: 1, marginBottom: 36, display: stage == "Profile" ? "flex" : "none" }} >
                <MainProfile
                    route={route} navigation={navigation}
                    accountUsername={username} setAccountUsername={setUsername} accountPassword={password} setAccountPassword={setPassword}
                    accountGender={gender} setAccountGender={setGender} accountEmail={email} setAccountEmail={setEmail}
                    accountAddress={address} setAccountAddress={setAddress} accountFriends={friends} setAccountFriends={setFriends}
                    accountLogout={logout}
                />
            </View>

            <View style={styles.bottom_bar}>
                <View style={styles.bottom_bar_grid}>
                    <TouchableOpacity id='explore-tab' style={styles.button} onPress={setStageToExplore}>
                        <Text style={stage == "Explore" ? styles.button_text_white : styles.button_text_black}>EXPLORE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom_bar_grid}>
                    <TouchableOpacity id='friends-tab' style={styles.button} onPress={setStageToFriends}>
                        <Text style={stage == "Friends" ? styles.button_text_white : styles.button_text_black}>FRIENDS</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom_bar_grid}>
                    <TouchableOpacity id='chat-tab' style={styles.button} onPress={setStageToChat}>
                        <Text style={stage == "Chat" || stage == "IndividualChat" ? styles.button_text_white : styles.button_text_black}>CHAT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom_bar_grid}>
                    <TouchableOpacity id='profile-tab' style={styles.button} onPress={setStageToProfile}>
                        <Text style={stage == "Profile" ? styles.button_text_white : styles.button_text_black}>PROFILE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'column',
        backgroundColor: colors.light_blue,
    },
    bottom_bar: {
        flexDirection: 'row',
        backgroundColor: colors.blue,
        height: 36,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    bottom_bar_grid: {
        flex: 1,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    button_text_black: {
        fontSize: 18,
        fontWeight: "600"
    },
    button_text_white: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
    hiddenButton: {
        width: 0,
        height: 0,
        opacity: 0,
    },
});

export default UserScreen;
