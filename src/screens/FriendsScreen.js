import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const FriendScreen = ({ accountUsername }) => {
    // Mock data for friend requests
    const [friendRequests, setFriendRequests] = useState([
        { id: '1', sender: 'Louis Hsiao', date: '2023-11-01', message: 'Hi, let\'s be friends!' },
        { id: '2', sender: 'Neel Faucher', date: '2023-11-03', message: 'I\'d like to add you to my friend list.' },
        { id: '3', sender: 'Alan Walker', date: '2023-11-03', message: 'I\'d like to add you to my friend list.' },
        { id: '4', sender: 'A-Train', date: '2023-11-03', message: 'I\'d like to add you to my friend list.' },
    ]);
    const [searchBarText, onChangeSearchBarText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        const getAllAccounts = async () => {
            const response = await getUser("");
            const response_json = await response.json();
            const response_code = response.status;
            if ((response).status >= 200 || (response).status < 300) {
                setAllAccounts(response_json);
            } else {
                setMessage("Error code: " + response_code);
            }
        }
        getAllAccounts();
    }, [accountUsername]);


    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>FRIENDS</Text>
            </View>


            <View style={styles.friendRequestsTitle}>
                <Text style={styles.sectionTitle}>FRIEND REQUESTS</Text>
            </View>
            <ScrollView style={styles.requests_container}>
                <FlatList
                    data={friendRequests}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.requestItem}>
                            <View style={styles.requestDetails}>
                                <Text style={styles.senderName}>{item.sender}</Text>
                                <Text style={styles.requestDate}>{item.date}</Text>
                                <Text style={styles.requestMessage}>{item.message}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.buttonText}>✓</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.buttonText}>✗</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
            <View style={styles.friendRequestsTitle}>
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
                        data={allAccounts}
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
                                        <TouchableOpacity style={styles.card_button} onPress={() => pressChat(item.username)}>
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
    friendRequestsTitle: {
        padding: 10,
        marginTop: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 12,
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
        marginHorizontal: 20,
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
        width: '97.2%',
        height: 32,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 20,
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
        paddingRight: 100,
        padding: 4,
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
        width: '97.2%',
        marginHorizontal: 20,
        height: 50,
        backgroundColor: colors.blue,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row"
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