import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {useState, useRef, useEffect} from 'react';
import * as MediaLibrary from 'expo-media-library';
import Button from './components/Button'


export default function App() {
  const [permission, setHasCameraPerm] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPerm(cameraStatus.status === 'granted');
    })();
  }, [])

  function toggleCameraType(){
    setType(current => (current === CameraType.back ? CameraType.font:CameraType.back));
    console.log("Button Pressed");
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type} 
        flashMode={flash} 
        ref = {cameraRef}
      >
        <Text>Hello</Text>
      </Camera>
      <View>
        <Button title = {"Take a picture"} icon="camera"/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  camera: {
    flex:1,
    borderRadius:20
  }

});
