import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { colors } from '../constants';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from '../components/AppButton';
import { getUser } from '../../features/steps/utils';
import exploreImage from '/src/components/navigation.png'; // Ensure correct path

const ChatScreen = () => {
    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        const getAllAccounts = async () => {
            const response = await getUser("");
            if (response.status >= 200 && response.status < 300) {
                const response_json = await response.json();
                setAllAccounts(response_json);
            } else {
                console.error('Error fetching accounts:', response.status);
            }
        };
        getAllAccounts();
    }, []);

    const onImageButtonPress = (username) => {
        console.log(`Image button pressed for user: ${username}`);
        Alert.alert(`Button pressed for user: ${username}`);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString(); // Formats date and time as a string
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>CHAT</Text>
            </View>
            <ScrollView style={styles.list_container}>
                <FlatList
                    data={allAccounts}
                    keyExtractor={item => item.username}
                    renderItem={({ item }) => (
                        <View style={styles.list_card}>
                            <View style={styles.card_text}>
                                <Text style={styles.userNameText}>{item.username}</Text>
                                <Text style={styles.timestampText}>{getCurrentDateTime()}</Text>
                            </View>
                            <View style={[styles.card_buttons]}>
                                <View style={styles.card_button_container}>
                                    <TouchableOpacity style={styles.card_button} onPress={() => pressChat(item.username)}>
                                        <MaterialCommunityIcons name={"message-processing-outline"} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    list_container: {
        flex: 1,
        maxHeight: 620,
    },
    topBanner: {
        backgroundColor: colors.blue,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
    },
    list_card: {
        backgroundColor: colors.blue,
        marginBottom: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
    },
    card_text: {
        flex: 4,
    },
    userNameText: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 20,
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
    card_buttons: {
        flexDirection: "row",
        alignItems: 'center',
    },
    card_button_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageButton: {
        width: 32,
        height: 32,
    },
    userNameText: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 18, // Slightly larger font size for username
        marginBottom: 5, // Add some space between username and timestamp
    },
    timestampText: {
        color: colors.dark_gray, // A softer color for the timestamp
        fontSize: 14, // Smaller font size for timestamp
    },
});

export default ChatScreen;