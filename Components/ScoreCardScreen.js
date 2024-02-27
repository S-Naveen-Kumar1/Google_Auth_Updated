import { useEffect, useState } from "react"
import { ActivityIndicator, ActivityIndicatorBase, Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, VirtualizedList } from "react-native"


// import { Text } from "react-native-svg"

const ScoreCardScreen = ()=>{
    const [userData,setUserData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [userId,setUserId] = useState('')

    const fetchUserData=async()=>{
        setIsLoading(true)
       try{
        const response = await fetch('https://reqres.in/api/users?page=2')
        const data = await response.json()
        // console.log(data.data,'data')
        setUserData(data.data)
       }
       catch(error){
        console.log(error)
       }
       finally{
        setIsLoading(false)
        console.log(isLoading,'finally')
       } 
    }

    useEffect(()=>{

     console.log('useEffect triggered')
     fetchUserData()
    },[])

     if(isLoading){
        console.log(isLoading,'before')
        return <ActivityIndicator />
     }
    const url = `https://www.google.com/`

    const handleUserId=(id)=>{
        console.log(id,'userId')
        setUserId(id)
        Alert.alert(`User with id ${id} is clicked!`)
    }

    const User = ({item,onPress,backgroundColor,color})=>(
        <View>
        <TouchableHighlight underlayColor='transparent'  onPress={onPress}>
            <View style={[styles.list,{backgroundColor:backgroundColor}]}>
            <View>
            <Image style={styles.image} source={{uri:item.avatar}}></Image>
            </View>
            <View >
            <Text onPress={()=>{Linking.openURL(url)}} >Email: {item.email}</Text>
            <Text >Name: {`${item.first_name+" "+item.last_name}`}</Text>
            </View>
            </View>
        </TouchableHighlight>
        </View>
    ) 

    const renderItem=({item})=>{
    
        const backgroundColor = (item.id===userId)?'lightblue':'white'
        // const color = (item.id===userId)?'white':''
        return(
            <User item={item} onPress={()=>handleUserId(item.id)} backgroundColor={backgroundColor}  />
        )
    }

    return(
        <SafeAreaView>
        <Text style={styles.heading}>Users Details</Text>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        </SafeAreaView>
    )
}

export default ScoreCardScreen

const styles = StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'500',
        textAlign:'center',
        marginTop:20
    },
    list:{
        borderWidth:1,
        borderColor:'black', 
        padding:5,
        flex:1,
        flexDirection:'row',
        gap:10,
        marginTop:5
    },
    image:{
        width:100,
        height:100,
      
        alignSelf:'center'
    },

})