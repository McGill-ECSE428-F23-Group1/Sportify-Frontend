import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { colors } from '../constants';
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
            <ScrollView style={styles.list_container}>
                <FlatList
                    data={allAccounts}
                    keyExtractor={item => item.username}
                    renderItem={({ item }) => (
                        <View style={styles.list_card}>
                            <View style={styles.card_text}>
                            <Text style={styles.boldText}>{item.username}</Text> {getCurrentDateTime()}
                            </View>
                            <View style={styles.card_button_container}>
                                <TouchableOpacity onPress={() => onImageButtonPress(item.username)}>
                                    <Image source={exploreImage} style={styles.imageButton} />
                                </TouchableOpacity>
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
        flex: 1,
        backgroundColor: colors.light_blue,
        margin: 20,
        flexDirection: 'column',
    },
    list_container: {
        flex: 1,
    },
    list_card: {
        width: '100%',
        height: 85,
        backgroundColor: colors.blue,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 11,
    },
    card_text: {
        flex: 4,
    },
    boldText: {
        fontWeight: 'bold',
    },
    card_button_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 0,
        right: -150,
    },
    imageButton: {
        width: 32,
        height: 32,
    },
});

export default ChatScreen;
    