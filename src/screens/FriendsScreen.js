import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fonts } from '../constants';
import { createUser, getUser, deleteUser, getFriendRequestsReceived, acceptFriendRequest, addFriend, declineFriendRequest } from '../../features/steps/utils';


const FriendScreen = ({ accountUsername, setFriendUsername, navigateToIndividualChat }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchBarText, onChangeSearchBarText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (accountUsername != '') {
                getUser(accountUsername)
                    .then(response => {
                        if (response.status < 200 || response.status >= 300) {
                            setMessage("Error code: " + response_code);
                        } else {
                            response.json()
                                .then(async response_json => {
                                    const friendProfiles = await Promise.all(
                                        response_json.friends.map(async username => await (await getUser(username)).json())
                                    );
                                    setFriends(friendProfiles);
                                });
                        }
                    });
                getFriendRequestsReceived(accountUsername)
                    .then(response => response.json())
                    .then(requests => setFriendRequests(requests.filter(request => request.status == 'PENDING')))
            }
        }, 500); // Fetch friends list and friend requests every 0.5 seconds, in case they are updated after the user logs in
        return () => clearInterval(intervalId); // Unmount the polling at teardown
    }, [accountUsername]);

    const onImageButtonPress = (username) => {
        console.log(`Image button pressed for user: ${username}`);
        Alert.alert(`Button pressed for user: ${username}`);
        setFriendUsername(username);
        navigateToIndividualChat();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>FRIENDS</Text>
            </View>


            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>FRIEND REQUESTS</Text>
            </View>
            <ScrollView style={styles.requests_container}>
                <FlatList
                    data={friendRequests}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.requestItem}>
                            <View style={styles.requestDetails}>
                                <Text style={styles.senderName}>{item.sender.username}</Text>
                                <Text style={styles.requestDate}>{item.date}</Text>
                                <Text style={styles.requestMessage}>{item.message}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    id={`accept-friend-request-button-${item.sender.username}`}
                                    style={styles.actionButton}
                                    onPress={() => {
                                        acceptFriendRequest(item.id)
                                            .then(() => addFriend(accountUsername, item.sender.username))
                                            .then(() => alert('Friend request accepted'));
                                    }}
                                >
                                    <Text style={styles.buttonText}>✓</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    id={`decline-friend-request-button-${item.sender.username}`}
                                    style={styles.actionButton}
                                    onPress={() => {
                                        declineFriendRequest(item.id)
                                            .then(() => alert('Friend request declined'));
                                    }}
                                >
                                    <Text style={styles.buttonText}>✗</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>My FRIENDS</Text>
            </View>
            <View style={styles.search_bar}>
                <TextInput
                    onChangeText={onChangeSearchBarText}
                    value={searchBarText}
                    style={styles.search_bar_text}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    spellCheck={false}
                    maxLength={20}
                />
                <TouchableOpacity style={styles.search_bar_button} onPress={() => { setSearchText(searchBarText) }}>
                    <MaterialCommunityIcons name={"magnify"} size={25} />
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 10 }}>
                <ScrollView style={styles.list_container}>
                    <FlatList
                        data={friends}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={[styles.list_card, {
                                display: ((item.username != accountUsername) && ((searchText == "") || (item.username.includes(searchText)))) ? "flex" : "none"
                            }]}>
                                <View style={[styles.card_text]}>
                                    <Text style={styles.senderName}>{item.username}</Text>
                                </View>
                                <View style={[styles.card_buttons]}>
                                    <View style={styles.card_button_container}>
                                        <TouchableOpacity style={styles.card_button} onPress={() => onImageButtonPress(item.username)}>
                                            <MaterialCommunityIcons name={"message-processing-outline"} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Page Title
    container: {
        flexDirection: 'column',
    },
    sectionTitleContainer: {
        padding: 10,
        marginTop: 10,
        backgroundColor: colors.light_blue, // Optional: Background color for the title container
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20, // Larger and more prominent font size
        color: colors.dark_blue, // Color that matches your app's theme
        textTransform: 'uppercase', // Optional: Transform text to uppercase for stylistic preference
    },
    topBanner: {
        backgroundColor: colors.blue,
        padding: 10,
        alignItems: 'center',
    },
    bannerText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
    },
    // Friend Requests
    friendRequestsSection: {
        flex: 1,
        padding: 10,
    },
    requestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.blue,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    senderName: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 16,
    },
    requestDate: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.black,
        marginBottom: 5,
    },
    requestMessage: {
        fontSize: 14,
        color: colors.black,
    },
    actionButtons: {
        flexDirection: 'row', // Align buttons horizontally
        alignItems: 'center',
    },
    actionButton: {
        width: 30,
        height: 30,
        backgroundColor: colors.white,
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        color: colors.black,
    },
    //
    search_bar: {
        height: 32,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    search_bar_text: {
        flex: 1,
        marginRight: 32,
        marginLeft: 6,
        marginVertical: 6,
        fontSize: 15,
        fontWeight: '500',
    },
    search_bar_button: {
        backgroundColor: colors.blue,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        right: 0,
        borderRadius: 5,
    },
    card_text: {
        flex: 1,
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
    list_container: {
        flex: 1,
        maxHeight: 320,
    },
    requests_container: {
        flex: 1,
        maxHeight: 165,
    },
});

export default FriendScreen;