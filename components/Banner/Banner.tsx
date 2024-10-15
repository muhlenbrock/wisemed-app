import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Banner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WiseMed</Text>
      <Text style={styles.subtitle}>Elevating Hospital Care</Text>
      <View style={styles.containerImage}>
        <Image
          source={require(`../../assets/images/doctors.png`)}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65c4a8', // Color de fondo azul
    borderRadius: 18,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#fff'
  },
  containerImage: {
    alignItems: 'center',
    height: windowHeight / 3
  },
  image: {
    height: windowHeight / 3
  }
});
