import { useState, useEffect } from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, Alert, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, fonts } from '../constants';
import AppButton from '../components/AppButton';
import { createUser, getUser, deleteUser } from '../../features/steps/utils';


const ExploreScreen = ({route, navigation, accountUsername}) => {

    const [allAccounts, setAllAccounts] = useState([]);
    const [searchBarText, onChangeSearchBarText] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const getAllAccounts = async () => {
            const response = await getUser("");
            const response_json=await response.json();
            const response_code=response.status;
            if((response).status>=200 || (response).status<300){
                setAllAccounts(response_json);
            }else{
                setMessage("Error code: "+response_code);
            }
        }
        getAllAccounts();
    }, [accountUsername]);

    const pressAddFriend = async(friend_username) => {
        console.log(friend_username)
    };

    const pressChat = async(chat_username) => {
        console.log(chat_username)
    };

    return(
        <View style={styles.container}>
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
                <TouchableOpacity style={styles.search_bar_button} onPress={()=>{setSearchText(searchBarText)}}>
                    <MaterialCommunityIcons name={"magnify"} size={25}/>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
                <ScrollView style={styles.list_container}> 
                    <FlatList
                        data={allAccounts}
                        keyExtractor={item => item.username}
                        renderItem={({item}) => 
                            <TouchableOpacity style={[styles.list_card, {height: 50+10*item.sports.length, 
                            display: ((item.username!=accountUsername)&&((searchText=="")||(item.username.includes(searchText))))? "flex":"none"}]}>
                                <View style={[styles.card_text, {height:50+10*item.sports.length}]}>
                                    <Text style={fonts.card_title}>{item.username}</Text>
                                    <FlatList
                                        data={item.sports}
                                        keyExtractor={item => item.id}
                                        renderItem={({item}) => 
                                            <View>
                                                <Text style={fonts.card_text}>{item.sportName.toUpperCase()} - {item.sportLevel}</Text>
                                            </View>
                                        }
                                    />
                                </View>
                                <View style={[styles.card_buttons, {height:50+10*item.sports.length}]}>
                                    <View style={styles.card_button_container}>
                                        <TouchableOpacity style={styles.card_button} onPress={()=>pressAddFriend(item.username)}>
                                            <MaterialCommunityIcons name={"account-plus"} size={25}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.card_button_container}>
                                        <TouchableOpacity style={styles.card_button} onPress={()=>pressChat(item.username)}>
                                            <MaterialCommunityIcons name={"message-processing-outline"} size={25}/>
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
        container: {
            flex: 1,
            backgroundColor: colors.light_blue,
            margin: 20,
            flexDirection: 'column'
        },
        list_container: {
            flex: 1,
            maxHeight: 620,
        },
        list_card:{
            width: '100%',
            height: 50,
            backgroundColor: colors.blue,
            marginBottom: 10, 
            flexDirection: "row"
        },
        card_text:{
            flex: 1,
            paddingRight: 100,
            padding: 4,
        },
        card_buttons:{
            width: 100,
            flexDirection: "row",
        },
        card_button_container:{
            flex:1,
            alignItems: "center",
            justifyContent: "center"
        },
        card_button:{
            width:32, 
            height:32, 
            borderRadius:18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.white
        },
        search_bar:{
            width: '100%',
            height: 32,
            backgroundColor: colors.white,
            flexDirection: 'row'
        },
        search_bar_text:{
            flex:1,
            marginRight: 32,
            marginLeft: 6,
            marginVertical: 6,
            fontSize: 15,
            fontWeight: '500',
        },
        search_bar_button:{
            backgroundColor: colors.blue,
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
            position: 'absolute',
            right: 0
        }

    })

export default ExploreScreen;
