import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { colors } from '../constants';
import { getUser } from '../../features/steps/utils';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import exploreImage from '/src/components/navigation.png'; // Ensure correct path

const ChatScreen = ({ accountUsername, setFriendUsername, navigateToIndividualChat }) => { // Assuming you have accountUsername
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (accountUsername !== '') {
                try {
                    const response = await getUser(accountUsername);
                    if (response.status >= 200 && response.status < 300) {
                        const user = await response.json();
                        const friendProfiles = await Promise.all(
                            user.friends.map(async username => await (await getUser(username)).json())
                        );
                        setFriends(friendProfiles);
                    } else {
                        console.error('Error fetching user details:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching friends:', error);
                }
            }

        }, 500); // Fetch friends list every 0.5 seconds, in case they are updated after the user logs in
        return () => clearInterval(intervalId); // Unmount the polling at teardown
    }, [accountUsername]);

    const onImageButtonPress = (username) => {
        console.log(`Image button pressed for user: ${username}`);
        Alert.alert(`Button pressed for user: ${username}`);
        setFriendUsername(username);
        navigateToIndividualChat();
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString(); // Formats date and time as a string
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>SEND CHAT TO FRIENDS</Text>
            </View>

            <ScrollView style={styles.list_container}>
                <FlatList
                    data={friends}  // TODO: Only friends with chat history should be displayed
                    keyExtractor={(item, index) => index.toString()}
                    //keyExtractor={(item, index) => item.username + index}  // Combine username and index to ensure unique keys
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.list_card}>
                            <View style={styles.card_text}>
                                <Text style={styles.boldText}>{item.username}</Text>
                            </View>
                            <View style={[styles.card_buttons]}>
                                <View style={styles.card_button_container}>
                                    <TouchableOpacity style={styles.card_button} onPress={() => onImageButtonPress(item.username)}>
                                        <MaterialCommunityIcons name={"message-processing-outline"} size={25} />                                </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light_blue,
        flexDirection: 'column',
    },
    list_container: {
        flex: 1,
    },
    list_card: {
        backgroundColor: colors.blue,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card_text: {
        flex: 4,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    card_buttons: {
        flexDirection: "row",
        alignItems: 'center',
    },
    card_button_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    card_button: {
        width: 32,
        height: 32,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        marginHorizontal: 10,
    },
    imageButton: {
        width: 32,
        height: 32,
    },
    topBanner: {
        backgroundColor: colors.blue,
        padding: 10,
        alignItems: 'center',
        marginBottom: 60,
    },
    bannerText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ChatScreen;