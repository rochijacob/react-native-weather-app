import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform, // aplica estilo basado en el OS
  TextInput 
} from 'react-native'; //La primera declaracion trae el stylesheet api

import SearchInput from './components/SearchInput';

import getImageForWeather from './utils/getImageForWeather';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
source={getImageForWeather('Clear')}
style={styles.imageContainer}
imageStyle={styles.image}
>
<View style={styles.detailsContainer}>
<Text style={[styles.largeText, styles.textStyle]}>San Francisco</Text>
      <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
      <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
    
      <SearchInput placeholder="Search any city" />
</View>
</ImageBackground>
    </KeyboardAvoidingView>
  );
}

//Puedo usar reactnative stylesheet api 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign:'center',
    ...Platform.select({
      ios: {
      fontFamily: 'AvenirNext-Regular',
      },
      android: {
      fontFamily: 'Roboto',
      },
    }),
    //fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    },
});
