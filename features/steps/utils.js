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
const deleteUser = async username => await fetch(`${apiBaseUrl}/member/${username}`, { method: 'DELETE' });

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

const getSportLevelPairsFromString = s =>
    s.split(",").map(sportLevelPairAsString => {
        const sportLevelPairAsArray = sportLevelPairAsString.split(":");
        return { sportName: sportLevelPairAsArray[0], sportLevel: sportLevelPairAsArray[1] };
    });

module.exports = { apiBaseUrl, frontendBaseUrl, createUser, updateBasicProfile, getUser, deleteUser, addSportLevel, updateSportLevel, getSportLevelPairsFromString };
