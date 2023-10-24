const apiBaseUrl = 'http://localhost:8080';
const frontendBaseUrl = 'http://localhost:19006';

const createUser = async (username, password) => await fetch(
    `${apiBaseUrl}/member/${username}?` + new URLSearchParams({ password: password }),
    { method: 'POST' }
);
const getUser = async username => await fetch(`${apiBaseUrl}/member/${username}`, { method: 'GET' });
const deleteUser = async username => await fetch(`${apiBaseUrl}/member/${username}`, { method: 'DELETE' });

module.exports = { apiBaseUrl, frontendBaseUrl, createUser, getUser, deleteUser };
