import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const FriendScreen = () => {
    // Mock data for friend requests
    const [friendRequests, setFriendRequests] = useState([
        { id: '1', sender: 'John Doe', date: '2023-11-01', message: 'Hi, let\'s be friends!' },
        { id: '2', sender: 'Jane Smith', date: '2023-11-03', message: 'I\'d like to add you to my friend list.' },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>FRIENDS</Text>
            </View>


            <View style={styles.friendRequestsTitle}>
                <Text style={styles.sectionTitle}>FRIEND REQUESTS</Text>
            </View>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

export default FriendScreen;
