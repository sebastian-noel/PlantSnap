import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import * as medialibrary from 'expo-media-library';
import { useRef } from 'react';


export default function HomeScreen() {
    let cameraRef = useRef();
    const [hasCamPerms, requestCamPermission] = useCameraPermissions();
    const [hasMediaLibPerms, requestMediaPermission] = medialibrary.usePermissions();

  if (!hasCamPerms || !hasMediaLibPerms) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!hasCamPerms.granted || !hasMediaLibPerms.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permissions use the App!</Text>
        <Button onPress={requestCamPermission} title="CAMERA permission" />
        <Button onPress={requestMediaPermission} title="MEDIA permission" />
      </View>
    );
  }


function takePicture() {
    if (cameraRef.current) {
        console.log('Taking picture...');
    }
}

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={'back'}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.galleryButton} onPress={takePicture}>
          <Image 
                source={require('../../assets/GalleryIcon.png')}
                style={styles.galleryImage} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Image 
                source={require('../../assets/PhotoButton.png')}
                style={styles.galleryImage} 
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
        position: 'absolute', // Position the container absolutely within the parent
        bottom: 50, // Position it 50px from the bottom
        width: '100%', // Full width of the screen
        alignItems: 'center', // Center items horizontally
      },
      button: {
        width: 100, // Width of the "Take Picture" button
        height: 100, // Height of the "Take Picture" button
        justifyContent: 'center',
        alignItems: 'center',
      },
      galleryButton: {
        position: 'absolute', // Position the gallery button absolutely
        left: 45, // Offset the gallery button to the left
        bottom: 15, // Align it with the bottom of the container
        width: 60, // Smaller width for the "Gallery" button
        height: 60, // Square shape for the "Gallery" button
        alignItems: 'center',
        justifyContent: 'center',
      },
      galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
  });