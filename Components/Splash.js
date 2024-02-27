import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"

const Splash = ({navigation})=>{
    const [count,setCount]= useState(0)

    const AuthenticationCheck =async()=>{
        try{
            const auth = JSON.parse(await AsyncStorage.getItem(('flag')))
            console.log(auth)
            const id= setTimeout(async()=>{
                
                if(auth){
                    navigation.navigate('Dashboard')
                }else{
                    navigation.navigate('Register')
                }
            },2000)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        AuthenticationCheck()
    },[])
    return(
        <SafeAreaView style={styles.view}>
            <Text style={styles.text}>App is Opening..Please wait..</Text>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    text:{
        alignSelf:'center'
    }
})