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

const ConversionInput = ({
  navigation,
  apiData,
  currency,
  setCurrency,
  value,
  onChangeText,
  disabled,
}) => (
  <View
    style={[
      styles.inputContainer,
      {
        backgroundColor: disabled ? 'rgb(220, 220, 220)' : 'rgb(250, 250, 250)',
      },
    ]}
  >
    <TouchableOpacity
      style={styles.leftInput}
      onPress={() => navigation.navigate('CurrencySelection', { apiData, setCurrency, currency })}
    >
      <Text style={styles.inputTitle}>{currency}</Text>
    </TouchableOpacity>
    <TextInput
      editable={!disabled}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder="0,00"
    />
  </View>
);

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      inputCurrencies: ['USD', 'BRL'],
      firstInput: '',
    };
  }

  async componentWillMount() {
    const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
    const data = await response.json();
    const { base, date, rates } = data;
    const newData = {
      base,
      date,
      rates: Object.entries(rates).map(([key, value]) => ({ currency: key, value })),
    };
    this.setState({ apiData: newData });
  }

  render() {
    const { navigation } = this.props;
    const { apiData, inputCurrencies, firstInput } = this.state;

    const [firstCurrency, secondCurrency] = inputCurrencies;
    let secondInput = '';
    let firstCurrencyValue = 0;
    let secondCurrencyValue = 0;
    let day = '';
    let month = '';
    let year = '';
    if (apiData.rates) {
      [, year, month, day] = apiData.date.match(/(\d{4})-(\d{2})-(\d{2})/);
      firstCurrencyValue = apiData.rates.find(({ currency, value }) => currency === firstCurrency)
        .value;
      secondCurrencyValue = apiData.rates.find(({ currency, value }) => currency === secondCurrency)
        .value;
      if (firstInput !== '') {
        secondInput = ((Number(firstInput) / firstCurrencyValue) * secondCurrencyValue).toFixed(2);
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={require('../assets/conversion.png')} />
        </View>
        <Text style={styles.title}>Conversor de Moedas</Text>
        <ConversionInput
          apiData={apiData}
          navigation={navigation}
          currency={firstCurrency}
          setCurrency={newCurrency =>
            this.setState({ inputCurrencies: [newCurrency, secondCurrency] })
          }
          value={firstInput}
          onChangeText={newText => this.setState({ firstInput: newText })}
        />
        <ConversionInput
          apiData={apiData}
          navigation={navigation}
          currency={secondCurrency}
          setCurrency={newCurrency =>
            this.setState({ inputCurrencies: [firstCurrency, newCurrency] })
          }
          value={secondInput}
          disabled
        />
        <Text style={styles.conversionText}>{`1 ${firstCurrency} = ${(
          secondCurrencyValue / firstCurrencyValue
        ).toFixed(2)} ${secondCurrency} em ${day} de ${month}, ${year}`}</Text>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => this.setState({ inputCurrencies: [secondCurrency, firstCurrency] })}
        >
          <Image style={styles.bottomButtonIcon} source={require('../assets/rotate.png')} />
          <Text style={styles.bottomButtonText}>Alternar Moedas</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
