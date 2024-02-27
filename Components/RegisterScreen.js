import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, {useState} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '739776953510-slr1t00227fk7ro20g09sr5e0ln4nucv.apps.googleusercontent.com',
  iosClientId:
    '739776953510-inqd4cvn75orp1ffh1pmojahmfnuolfb.apps.googleusercontent.com',
});

export default RegisterScreen = ({navigation})=>{
    const [user, setUserInfo] = useState(null)
    const [inputs,setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")
    // const [name,setName] = useState("")

    const handleChange = (name,text) =>{
       setInputs((prev)=>({
           ...prev,
           [name]:text
       }))
    }

    const handleRegister = async()=>{
        let userObj = inputs
        try{
             const response = await fetch(`https://dummy-server-ipe7.onrender.com/users/register`, {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userObj),
              });
             const data = await response.json()
             Alert.alert(data.message, '', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => navigation.navigate('Login') },
              ]);
        }
        catch(err){
            console.log(err)
        }
    }

    const signIn = async () => {
        try {
          console.log('success');
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfo(userInfo); // Update user info state
          console.log(userInfo, "navigate");
        console.log(userInfo.user.name);
        navigation.navigate('Dashboard', userInfo.user.name,userInfo.user.photo );
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };
    return (
        
        <SafeAreaView>
            <View style={styles.view}>
                <Text style={styles.text}>Email Id</Text>
                <TextInput style={styles.input} name={'email'} value={inputs.email} onChangeText={(text)=>handleChange('email',text)}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={inputs.password} name={'password'} onChangeText={ (text)=>handleChange('password',text)}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Joining Name</Text>
                <TextInput style={styles.input} name={'email'}  value={inputs.name} onChangeText={ (text)=>handleChange('name',text)}></TextInput>
            </View>
           
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.button} >
                <Text>Register</Text>
            </TouchableOpacity>

            <View style={styles.container}>
      <Text style={styles.heading}>Push Notification</Text>
      <GoogleSigninButton
        style={styles.googleSignInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
      />
    </View>
            
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    input:{
        height: 50,
        borderWidth: 1,
        borderColor:'lightgray',
        borderRadius:5,
        padding: 10,
    },
    view:{
        padding:20
    },
    text:{
        marginBottom:4
    },
    button:{
        alignItems: 'center',
        backgroundColor: 'skyblue',
        padding: 10,
        width:'60%',
        alignSelf:'center',
        marginTop:20,
        borderRadius:6
    },
    auth:{
        paddingTop:15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop:15
      },
      heading: {
        fontSize: 24,
        marginBottom: 20,
      },
      googleSignInButton: {
        width: 192,
        height: 48,
        marginTop: 20,
      },
})