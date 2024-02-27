import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Platform } from "react-native";
import { RNCamera } from "react-native-camera";
import { PERMISSIONS,check,request } from "react-native-permissions";


const CameraScreenPage = () => {
    const [snap,setSnap] = useState('')

    const CAMERA_PERMISSION = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
      });
    
const checkPermission=async()=>{
    const checkPermission = await check(CAMERA_PERMISSION)
    console.log(checkPermission,'permission checked')
    if(checkPermission==='denied'){
        requestPermissions()
    }else{
        console.log('permission granted')
    }
}


const requestPermissions = async () => {
    try {
      const cameraStatus = await request(CAMERA_PERMISSION);
   
      console.log('Camera Permission:', cameraStatus);

    } catch (error) {
     
      console.error('Permission Request Error:', error);
    }
  }

  useEffect(()=>{
   checkPermission()
  },[])
  
const takePicture = async()=>{
    if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        
        setSnap(data.uri)
      }
}

    return (
        <SafeAreaView style={styles.container}>
           <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
         
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        {
            snap !=="" && 

            <View style={styles.imageContainer}>
                <Image source={{uri:snap}} style={styles.image} ></Image>
            </View>
        }
       
        </SafeAreaView>
    )
}
export default CameraScreenPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    imageContainer:{
        borderWidth:1,
        borderColor:'black',
        height:100,
        width:100
    },
    image:{
        width:100,
        height:100,
    }
});
