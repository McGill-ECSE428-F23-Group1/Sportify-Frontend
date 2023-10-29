import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';

const sports = ['Football', 'Basketball', 'Tennis', 'Swimming', 'Golf'];
const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced'];

const MainProfile = ({route, navigation, 
  accountUsername, setAccountUsername, 
  accountPassword, setAccountPassword, 
  accountGender, setAccountGender, 
  accountEmail, setAccountEmail, 
  accountAddress, setAccountAddress, 
  accountFriends, setAccountFriends, accountLogout
}) => {
  const [username, setUsername] = useState(accountUsername);
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [privateMode, setPrivateMode] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);

  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [isSportsModalVisible, setSportsModalVisible] = useState(false);

  const toggleGenderModal = () => setGenderModalVisible(!isGenderModalVisible);
  const toggleSportsModal = () => setSportsModalVisible(!isSportsModalVisible);

  getUser(accountUsername)
  .then(response => response.json())
  .then(profile => {
    setUsername(profile.username);
    setPassword(profile.password);
    setGender(profile.gender);
  })
  .catch(e => console.log(e))

  const handleSave = () => {
    // Implement the save functionality
    // Update hookers from parent page
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {
      deleteUser(accountUsername)
      .then(() => {
        alert('Account deleted successfully')
        navigation.navigate("OnBoard", {
          screen: "OnBoard",
          params: {},
        });
      })
      .catch(e => console.log(e))
    }
  };

  const renderGenderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isGenderModalVisible}
    >
      {/* ... (no changes in this part) */}
    </Modal>
  );

  const renderSportsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSportsModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Select Sport</Text>
          <FlatList
            data={sports}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedSport(item);
                  toggleSportsModal();
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const renderProficiencyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSportsModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Select Proficiency Level</Text>
          <FlatList
            data={proficiencyLevels}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedProficiency(item);
                  toggleSportsModal();
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderGenderModal()}
      {renderSportsModal()}
      {renderProficiencyModal()}

      <Text style={styles.header}>Profile</Text>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Gender:</Text>
        <TouchableOpacity style={styles.genderButton} onPress={toggleGenderModal}>
          <Text style={{ color: 'white' }}>{gender}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text>Private Mode:</Text>
        <Switch
          value={privateMode}
          onValueChange={(value) => setPrivateMode(value)}
        />
      </View>

      <Text style={styles.label}>Sports:</Text>
      <View style={styles.sportsContainer}>
        <TouchableOpacity
          style={styles.sportDropdown}
          onPress={toggleSportsModal}
        >
          <Text style={{ color: 'white' }}>{selectedSport || 'Select Sport'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sportDropdown}
          onPress={toggleSportsModal}
        >
          <Text style={{ color: 'white' }}>{selectedProficiency || 'Select Proficiency'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.logoutButton} onPress={accountLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
  },
  usernameContainer: {
    alignItems: 'center',
    marginBottom: 100, // Increase the gap between username and the next field
  },
  username: {
    textAlign: 'center',
    fontSize: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    marginLeft: 10,
    padding: 5,
  },
  label: {
    marginTop: 50,
    fontSize: 16,
  },
  sportsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sportDropdown: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    marginRight: 10,
    marginBottom: 30, // Add padding inside the text input
  },
  deleteButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    marginBottom: 30, // Add padding inside the text input
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  genderButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    minWidth: 300,
  },
  modalHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MainProfile;
