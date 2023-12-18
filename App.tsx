import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Text,
  TextInput,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Countries} from './assets/countriesData';
import {scale, verticalScale} from './assets/Dimensions';

const {width, height} = Dimensions.get('window');

const CustomPicker = ({heading = 'Select Currency', value, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        borderRadius: scale(10),
        width: scale(269),
        height: verticalScale(46),
        elevation: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {width: 10, height: 0},
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
      }}>
      <Text
        style={{
          fontSize: scale(15),
          color: heading === value ? '#121212' : 'black',
          width: '80%',
          fontFamily: 'SpaceGrotesk-Regular',
        }}>
        {value === heading ? value : Countries[value].CN}
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: scale(15),
        }}>
        ▼
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const SplashPosition = useRef(new Animated.Value(0)).current;

  const [baseCurrency, setBaseCurrency] = useState('Select Currency');
  const [baseValue, setBaseValue] = useState('');
  const [exchangeCurrency, setExchangeCurrency] = useState('Select Currency');
  const [selecting, setSelecting] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState({});

  const Navigate = () => {
    Animated.timing(SplashPosition, {
      toValue: -width,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const OpenSheet = () => {
    Animated.timing(SplashPosition, {
      toValue: -(width * 2),
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(SplashPosition, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const HomeScreenPosition = SplashPosition.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, width],
  });

  const PickerPosition = SplashPosition.interpolate({
    inputRange: [-(width * 2), -width],
    outputRange: [0, width],
  });

  const PickerRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (selecting === 'BASE') {
            setBaseCurrency(index);
            closeSheet();
            getExchangeRate(index);
          } else if (selecting === 'NOTBASE') {
            setExchangeCurrency(index);
            closeSheet();
          }
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.FL}}
            style={{
              width: 65,
              height: 65,
              resizeMode: 'cover',
            }}
          />
        </View>

        <Text
          style={{
            color: 'white',
            fontSize: scale(16),
            fontWeight: '700',
            marginLeft: scale(15),
            width: '80%',
          }}>
          {item.CN}
        </Text>
      </TouchableOpacity>
    );
  };

  const getExchangeRate = async index => {
    try {
      setLoading(true);
      var requestOptions = {
        method: 'GET',
      };

      fetch(
        `https://v6.exchangerate-api.com/v6/1530dbaac47fd40d3c3cfc92/latest/${Countries[index].CC}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => onSuccess(result));
    } catch (error) {
      onError(error);
    }
  };

  const onSuccess = res => {
    if (res.result === 'success') {
      setExchangeRate(res.conversion_rates);
      setLoading(false);
      setTimeout(() => {
        console.log(exchangeRate);
      }, 5000);
    } else {
      onError(res);
    }
  };

  const onError = err => {
    setLoading(false);
    Alert.alert(err.result, err['error-type']);
  };

  const calculatedValue = () => {
    if (
      exchangeRate.length !== 0 &&
      exchangeCurrency !== 'Select Currency' &&
      baseValue !== ''
    ) {
      return baseValue * exchangeRate[Countries[exchangeCurrency].CC];
    } else return '0000';
  };

  const handleSwitch = () => {
    if (
      exchangeCurrency !== 'Select Currency' &&
      baseCurrency === 'Select Currency'
    ) {
      getExchangeRate(exchangeCurrency);
      setBaseCurrency(exchangeCurrency);
      setExchangeCurrency('Select Currency');
    } else if (
      baseCurrency !== 'Select Currency' &&
      exchangeCurrency === 'Select Currency'
    ) {
      let temp = baseCurrency;
      setExchangeCurrency(temp);
      setBaseCurrency('Select Currency');
      setExchangeRate({});
    } else if (
      baseCurrency !== 'Select Currency' &&
      exchangeCurrency !== 'Select Currency'
    ) {
      getExchangeRate(exchangeCurrency);
      let temp = baseCurrency;
      setBaseCurrency(exchangeCurrency);
      setExchangeCurrency(temp);
    } else {
      null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('./assets/images/bg.png')}
        style={styles.mainContainer}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              transform: [
                {
                  translateX: SplashPosition,
                },
              ],
              width: width,
              height: height,
            },
          ]}>
          <View style={styles.SplashBottomContainer} />
          <View style={styles.SplashMiddleContainer}>
            <Image
              source={require('./assets/images/logo.png')}
              style={styles.SplashLogo}
            />
            {/* <Text style={styles.SplashLogoTag}>ExchangePal Pro</Text> */}
          </View>
          <View style={styles.SplashBottomContainer}>
            <TouchableOpacity
              style={styles.SplashButtonWrapper}
              onPress={Navigate}>
              <Text style={styles.SplashButtonTag}>Start</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: HomeScreenPosition,
              },
            ],
          }}>
          <Text style={styles.HomeTopHeading}>CurrencyCove</Text>
          <Text
            style={{alignSelf: 'center', fontFamily: 'SpaceGrotesk-Medium'}}>
            Get ready to make it rain with CurrencyCove!
          </Text>
          <View style={styles.HomeCenterCard}>
            <CustomPicker
              value={baseCurrency}
              onPress={() => {
                Keyboard.dismiss();
                setSelecting('BASE');
                OpenSheet();
              }}
            />
            <Text style={styles.HomeInputFieldTag}>Add Amount</Text>
            <TextInput
              onChangeText={setBaseValue}
              value={baseValue}
              keyboardType="number-pad"
              style={styles.HomeInputField}
              placeholder="0000"
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              onPress={() => handleSwitch()}
              style={styles.HomeCardCenterCircle}>
              <Image
                source={require('./assets/images/exchange.png')}
                style={styles.HomeCardCenterImage}
              />
            </TouchableOpacity>
            <CustomPicker
              value={exchangeCurrency}
              onPress={() => {
                Keyboard.dismiss();
                setSelecting('NOTBASE');
                OpenSheet();
              }}
            />
            <Text style={styles.HomeInputFieldTag} />
            <Text
              style={[
                styles.HomeExchangedField,
                {
                  color: baseValue === '' ? 'grey' : 'black',
                  fontFamily: 'SpaceGrotesk-Regular',
                },
              ]}>
              {calculatedValue()}
            </Text>
          </View>
          {Object.entries(exchangeRate).length !== 0 && (
            <Text style={styles.HomeBottomHeading}>
              Indicative Exchange Rate{' '}
              <Text style={styles.HomeBottomValue}>
                1 {Countries[baseCurrency].CC}
              </Text>
            </Text>
          )}
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 40,
            }}>
            {Object.entries(exchangeRate).map(([key, value]) => {
              if (key === Countries[baseCurrency].CC) return null;
              else
                return (
                  <Text style={styles.HomeBottomValue}>
                    {value} {key}
                  </Text>
                );
            })}
          </ScrollView>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            transform: [
              {
                translateX: PickerPosition,
              },
            ],
          }}>
          <TouchableOpacity onPress={closeSheet}>
            <Image
              source={require('./assets/images/takemeback.png')}
              style={styles.PickerBackButton}
            />
          </TouchableOpacity>
          <Text style={[styles.HomeTopHeading, {marginTop: verticalScale(10)}]}>
            Select Currency
          </Text>
          <FlatList
            data={Countries}
            renderItem={PickerRenderItem}
            style={{
              marginTop: 10,
            }}
            contentContainerStyle={{
              paddingHorizontal: scale(20),
              paddingBottom: 100,
            }}
            ItemSeparatorComponent={
              <View
                style={{
                  height: 5,
                }}
              />
            }
          />
        </Animated.View>
      </ImageBackground>
      {loading && (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 100,
              backgroundColor: '#6391FF',
              opacity: 0.5,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '95%',
                padding: 20,
                borderRadius: 20,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <ActivityIndicator animating size="large" color={'#E27959'} />
              <View
                style={{
                  marginLeft: 10,
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                  borderColor: '#C40759',
                }}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  Please Wait!
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                  }}>
                  Retrieving Exchange Rates...
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  SplashMiddleContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SplashBottomContainer: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SplashLogo: {
    width: scale(180),
    height: scale(180),
    resizeMode: 'contain',
  },
  SplashLogoTag: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Bold',
    marginTop: 5,
  },
  SplashButtonWrapper: {
    borderRadius: 100,
    height: verticalScale(60),
    backgroundColor: 'white',
    width: scale(210),
    alignItems: 'center',
    justifyContent: 'center',
  },
  SplashButtonTag: {
    fontSize: scale(30),
    color: 'black',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  HomeTopHeading: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(60),
    fontSize: scale(20),
    fontFamily: 'SpaceGrotesk-Bold',
  },
  HomeCenterCard: {
    marginTop: verticalScale(40),
    width: scale(329),
    borderRadius: scale(20),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(35),
  },
  HomeInputFieldTag: {
    color: 'black',
    fontSize: scale(8),
    height: verticalScale(20),
    width: scale(260),
    marginTop: verticalScale(5),
    fontFamily: 'SpaceGrotesk-Regular',
  },
  HomeInputField: {
    backgroundColor: 'white',
    width: scale(269),
    height: verticalScale(32),
    borderRadius: scale(10),
    elevation: 5,
    color: 'black',
    fontSize: scale(16),
    padding: 0,
    paddingHorizontal: scale(10),
    textAlignVertical: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  HomeCardCenterCircle: {
    width: scale(46),
    height: scale(46),
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(20),
  },
  HomeCardCenterImage: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  HomeExchangedField: {
    backgroundColor: 'white',
    width: scale(269),
    height: verticalScale(32),
    borderRadius: scale(10),
    elevation: 5,
    color: 'black',
    fontSize: scale(16),
    padding: 0,
    paddingHorizontal: scale(10),
    textAlignVertical: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  HomeBottomHeading: {
    color: 'white',
    fontSize: scale(16),
    marginLeft: scale(52),
    marginTop: verticalScale(31),
    marginBottom: verticalScale(5),
    fontFamily: 'SpaceGrotesk-Regular',
  },
  HomeBottomValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(20),
    marginLeft: scale(52),
    marginVertical: verticalScale(5),
    fontFamily: 'SpaceGrotesk-Bold',
  },
  PickerBackButton: {
    width: verticalScale(30),
    height: verticalScale(30),
    resizeMode: 'contain',
    marginLeft: scale(10),
    marginTop: verticalScale(30),
  },
});

export default App;
