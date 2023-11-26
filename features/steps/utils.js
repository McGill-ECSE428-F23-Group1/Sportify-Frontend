const apiBaseUrl = 'http://localhost:8080';
const frontendBaseUrl = 'http://localhost:19006';

const createUser = async (username, password) => await fetch(
    `${apiBaseUrl}/member/${username}?` + new URLSearchParams({ password: password }),
    { method: 'POST' }
);
const getUser = async username => await fetch(`${apiBaseUrl}/member/${username}`, { method: 'GET' });
const updateBasicProfile = async (username, password, gender) =>
    await fetch(`${apiBaseUrl}/member/${username}?` + new URLSearchParams({
        password: password,
        gender: gender
    }), { method: 'PATCH' });
const deleteUser = async username => {
    await fetch(`${apiBaseUrl}/member/${username}`, { method: 'DELETE' })
};

const addSportLevel = async (username, sport, level) =>
    await fetch(`${apiBaseUrl}/membersport/${username}?` + new URLSearchParams({
        sportName: sport,
        sportLevel: level
    }), { method: 'POST' });

const updateSportLevel = async (username, sport, level) =>
    await fetch(`${apiBaseUrl}/membersport/${username}?` + new URLSearchParams({
        sportName: sport,
        sportLevel: level
    }), { method: 'PATCH' });

const addFriend = async (username1, username2) =>
    await fetch(`${apiBaseUrl}/memberfriend?` + new URLSearchParams({
        username1: username1,
        username2: username2
    }), { method: 'POST' });

const addFriendRequest = async (senderUsername, receiverUsername, message) =>
    await fetch(`${apiBaseUrl}/friendRequest?` + new URLSearchParams({
        senderUsername: senderUsername,
        receiverUsername: receiverUsername,
        message: message
    }), { method: 'POST' });

const getFriendRequestsReceived = async (username) =>
    await fetch(`${apiBaseUrl}/friendRequest/receiver/${username}`, { method: 'GET' });

const acceptFriendRequest = async (id) =>
    await fetch(`${apiBaseUrl}/friendRequest/updateStatus/${id}?` + new URLSearchParams({ status: 'ACCEPTED' }), { method: 'PUT' });

const declineFriendRequest = async (id) =>
    await fetch(`${apiBaseUrl}/friendRequest/updateStatus/${id}?` + new URLSearchParams({ status: 'REJECTED' }), { method: 'PUT' });

const createChat = async (username1, username2) => {
    await fetch(`${apiBaseUrl}/chat?` + new URLSearchParams({
        member1Username: username1,
        member2Username: username2
    }), { method: 'POST' });
}

const createMessage = async (sender, receiver, content) => {
    await fetch(`${apiBaseUrl}/message?` + new URLSearchParams({
        senderUsername: sender,
        receiverUsername: receiver,
        description: content
    }), { method: 'POST' });
}

const getSportLevelPairsFromString = s =>
    s.split(",").map(sportLevelPairAsString => {
        const sportLevelPairAsArray = sportLevelPairAsString.split(":");
        return { sportName: sportLevelPairAsArray[0], sportLevel: sportLevelPairAsArray[1] };
    });

module.exports = {
    apiBaseUrl, frontendBaseUrl,
    createUser, updateBasicProfile, getUser, deleteUser, addSportLevel, updateSportLevel, getSportLevelPairsFromString,
    addFriend, addFriendRequest, getFriendRequestsReceived, acceptFriendRequest, declineFriendRequest,
    createChat, createMessage,
};
