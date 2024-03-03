//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

// create a component
const UserCard = ({ name, img, id, password, navigation, about, currentUser }) => {

    const chatScreen = () => {
        let roomId=uuid.v4()
        const myData = {
            roomId,
            name: currentUser.name,
            about: currentUser.about,
            email: currentUser.email,
            img: currentUser.img,
            lastMsg: ""
        };

        // Update data for sender
        database()
            .ref(`/chatlist/${id} Reciever:${name}/${currentUser.id} Sender:${currentUser.name}`)
            .update(myData)
            .then(() => console.log('Sender Data updated.'));

        // Delete password and set lastMsg to empty for sender
        const { password: _, ...senderData } = myData;
        senderData.lastMsg = "";
        senderData.roomId=roomId
        // Update data for receiver
        database()
            .ref(`/chatlist/${currentUser.id} Sender:${currentUser.name}/${id} Reciever:${name}`)
            .update(myData)
            .then(() => console.log('Receiver Data updated.'));

        // Navigate to ChatScreen
        navigation.navigate("ChatScreen", { id ,currentUser});
    };

    return (
        <TouchableHighlight underlayColor='transparent' onPress={chatScreen}>
            <View style={styles.card}>
                <Image
                    source={{ uri: img }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.about}>{about}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

// define your styles
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40, // to make the image circular
        marginRight: 10,
    },
    textContainer: {
        flex: 1, // to allow text to wrap if it's too long
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    about: {
        fontSize: 14,
        color: '#555',
    },
});

//make this component available to the app
export default UserCard;
