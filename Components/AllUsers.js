//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import database from '@react-native-firebase/database';
import UserCard from './UserCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Allusers = ({navigation}) => {
    const [allUser, setallUser] = useState([]);
    const [senderId,setSenderId]  = useState("")
    const [currentUser,setCurrentUser]=useState({})
    const getCurrentUser = async () => {
        console.log("inside getCurrentUser")
      const data = await AsyncStorage.getItem("Chatusers").then((res)=>JSON.parse(res))
      setSenderId(data.id)
      setCurrentUser(data)
    }
    useEffect(() => {
      getCurrentUser()
    }, [])
    useEffect(()=>{
        console.log("Inside uEf",senderId)
        getAllUser();
    },[senderId])
    //   useEffect(() => {
    //     // getAllUser();
    //   }, []);

    const getAllUser = async() => {
        await database()
          .ref('users/')
          .once('value')
          .then(snapshot => {
            console.log(senderId,"filter")
            console.log('all User data: ', Object.values(snapshot.val()).filter((item)=>item.id==senderId));
            setallUser(
              Object.values(snapshot.val()).filter((item)=>item.id!=senderId)
            );
           
          });
      };
    return (
        <View >
            <Text>Allusers</Text>
         {allUser?.length>0 && allUser.map((item)=><UserCard key={item.id} {...item} navigation={navigation} currentUser={currentUser}/>)}
        </View>
    );
};



//make this component available to the app
export default Allusers;
