import React, { useEffect, useState } from "react";
import { View,Text, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView, Switch, StyleSheet, SectionList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Products } from "./Components/Products";

 const App = () =>{
    const [value,setValue]=useState("")
    const [todoArray,setTodoArray]=useState([])
    const [isAdded,setIsAdded]=useState(false)
    const [count,setCount] = useState(0)
    const [isSet,setIsSet] = useState(false)
    const [movies,setMovies] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    console.log("itemem4=====",todoArray)
   
  

    
    const productList = [
        {name:'product1',detail:'detail1'},
        {name:'product1',detail:'detail1'},
        {name:'product1',detail:'detail1'},
        {name:'product1',detail:'detail1'}
    ]

    const getMovies = async()=>{
      try{
        const response = await fetch ('https://reactnative.dev/movies.json')
        const data = await response.json()
        console.log(data.movies,'data')
        setMovies(data.movies)
      }
      catch(error){
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
      
    }

    useEffect(()=>{
        getMovies()
    },[])

    // {console.log(movies)}
    
    return (
        <SafeAreaView>
        </SafeAreaView>
    )
}
export default App


const styles = StyleSheet.create({
    button:{
        backgroundColor:'blue',
        padding:4
    },
    text:{
        textAlign:'center'
    }
})