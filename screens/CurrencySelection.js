import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 24 + 12,
  },
  closeButton: {},
  closeIcon: {
    height: 30,
    width: 30,
  },
  title: {
    marginVertical: 24,
    fontSize: 30,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(180, 180, 180)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const CurrencySelection = ({ navigation }) => {
  const apiData = navigation.getParam('apiData');
  const setCurrency = navigation.getParam('setCurrency');
  const selectedCurrency = navigation.getParam('currency');
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Image style={styles.closeIcon} source={require('../assets/close.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>Escolha uma moeda:</Text>
      <View style={styles.bodyContainer}>
        {apiData.rates.map(({ currency }) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              {
                backgroundColor: selectedCurrency === currency ? 'rgb(220, 220, 220)' : 'white',
              },
            ]}
            onPress={() => {
              setCurrency(currency);
              navigation.goBack();
            }}
            key={currency}
          >
            <Text style={styles.itemText}>{currency}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CurrencySelection;
