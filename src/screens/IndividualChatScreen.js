import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../constants'; // adjust the import path as needed

const IndividualChatScreen = () => {
    const route = useRoute();
    const { username } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.topBanner}>
                <Text style={styles.bannerText}>{username}</Text>
            </View>
            <ScrollView style={styles.chatContainer}>
                {/* Chat messages will go here */}
            </ScrollView>
            {/* Any additional components like input fields for new messages */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBanner: {
        backgroundColor: colors.blue, // Adjust color as needed
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerText: {
        color: colors.white, // Adjust text color as needed
        fontSize: 20,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        // Add additional styling for the chat container if needed
    },
    // Add styles for other components like message input field, send button, etc.
});

export default IndividualChatScreen;
