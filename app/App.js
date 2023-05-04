
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  requestForegroundPermissionAsync,
  getCurrentPossitionAsync,
  LocationObject,
  requestForegroundPermissionsAsync
} from 'expo-location';


export default function App(){

  const {location, setLocation} = useState<LocationObject | null>(null);

  async function requestForegroundPermissionAsync(){
    const { granted } = await requestForegroundPermissionAsync();

    if(granted){
      const currentPosition = await getCurrentPossitionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestForegroundPermissionsAsync();
  },[]);

  return(
  <View style={styles.container}>

    {
      location &&
      <MapView style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      />

    }
      

  </View>

  )

 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: '100%',
  }
});
