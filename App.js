import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ConversionInput = () => (
  <View style={styles.inputContainer}>
    <TouchableOpacity style={styles.leftInput}>
      <Text style={styles.inputTitle}>USD</Text>
    </TouchableOpacity>
    <TextInput style={styles.input} placeholder="0,00" />
  </View>
);

const App = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Image style={styles.icon} source={require('./assets/conversion.png')} />
    </View>
    <Text style={styles.title}>Conversor de Moedas</Text>
    <ConversionInput />
    <ConversionInput />
    <Text style={styles.conversionText}>1 USD = 3,81 BRL em 8 de Julho, 2019</Text>
    <TouchableOpacity style={styles.bottomButton}>
      <Image style={styles.bottomButtonIcon} source={require('./assets/rotate.png')} />
      <Text style={styles.bottomButtonText}>Alternar Moedas</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(73, 97, 110)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 16,
  },
  conversionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButtonIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: 10,
  },
  bottomButtonText: {
    fontSize: 20,
    color: 'white',
  },
  inputContainer: {
    width: windowWidth - 24 * 2,
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 24,
  },
  leftInput: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(33, 57, 70)',
  },
  input: {
    fontSize: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default App;
