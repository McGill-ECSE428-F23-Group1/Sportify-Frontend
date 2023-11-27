import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { colors } from '../constants';
import { getUser } from '../../features/steps/utils';
import exploreImage from '/src/components/navigation.png'; // Ensure correct path

const ChatScreen = ({ accountUsername }) => { // Assuming you have accountUsername
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>Send a Chat to a Friend</Text>
            </View>

            <ScrollView style={styles.list_container}>
                <FlatList
                    data={friends}  // Use friends as the data source
                    keyExtractor={(item, index) => index.toString()}
                    //keyExtractor={(item, index) => item.username + index}  // Combine username and index to ensure unique keys
                    renderItem={({ item }) => (
                        <View style={styles.list_card}>
                            <View style={styles.card_text}>
                                <Text style={styles.boldText}>{item.username}</Text>
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
        height: 70,
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