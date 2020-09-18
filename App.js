import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Home</Text>
      <Button title='Scan now' onPress={() => {
        navigation.navigate('ScannerScreen');
      }} />
    </View>
  )
}

const OtherPageScreen = ({ navigation, route }) => {

  const { messageInfo } = route.params;
  return (
    <View style={styles.body}>
      <Text style={styles.bigText}>{JSON.stringify(messageInfo)}</Text>
    </View>
  )
}

const ScannerScreen = ({ navigation }) => {

  onSuccess = e => {
    navigation.navigate('OtherPage', {
      messageInfo: e.data
    });
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  return (
    <QRCodeScanner
      onRead={this.onSuccess}
      bottomContent={
        <Button title='OK. Got it!' />
      }
    />
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        <Stack.Screen name="OtherPage" component={OtherPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 16,
    margin: 10
  },
  bigText: {
    fontSize: 40,
    margin: 10
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;
