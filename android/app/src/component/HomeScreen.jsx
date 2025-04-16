import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { ScrollView } from 'react-native-gesture-handler';
import {debounce} from 'lodash';
// import {fatchLocation} from '../../api/weather.jsx'
import {fetchLocation, fetchWeatherForecast} from '../../api/weather.jsx';
import {weatherImage} from '../../constants/index.jsx';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const goToAbout = () => {
    navigation.navigate('About');
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const [search, setSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setweather] = useState({});

  const handleLocations = loc => {
    console.log('locations', loc);
    setLocations([]);
    setSearch(false);
    fetchWeatherForecast({
      name: loc.name,
      days: 7, // 🛠 Important: fetch 7 days of forecast
    }).then(data => {
      setweather(data);
      console.log('data', data);
    });
  };

  // const handleSearch = value => {
  //   // console.log('value', value);
  //   if(value.length>2){
  //     fatchLocation({name: value}).then(
  //       data=>{
  //         setLocation(data)
  //       }
  //     )
  //   }
  // };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocation({name: value}).then(data => {
        if (data) {
          setLocations(data);
        } else {
          setLocations([]);
        }
      });
    } else {
      setLocations([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const {current, location} = weather;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.background}
          resizeMode="cover">
          <View style={styles.content}>
            {/* Search Bar */}
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 20,
                position: 'relative',
              }}>
              {/* Search bar */}
              <View
                style={[
                  styles.searchContainer,
                  search && styles.expandedSearch,
                ]}>
                {search ? (
                  <>
                    <TextInput
                      style={styles.searchInput}
                      onChangeText={handleTextDebounce}
                      placeholder="Search"
                      autoFocus
                    />
                  </>
                ) : null}
                <TouchableOpacity
                  onPress={() => setSearch(!search)}
                  style={{paddingVertical: 10}}>
                  <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Dropdown List */}
              {locations.length > 0 && search ? (
                <View style={styles.dropdownContainer}>
                  {locations.map((loc, index) => {
                    const isNotLast = index + 1 !== locations.length;

                    return (
                      <TouchableOpacity
                        onPress={() => handleLocations(loc)}
                        key={index}
                        style={{
                          borderBottomWidth: isNotLast ? 2 : 0,
                          borderBottomColor: 'gray',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 5,
                        }}>
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#000"
                        />
                        <Text style={styles.dropdownItem}>
                          {loc?.name},{loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <View
              style={{
                marginHorizontal: 4,
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {location?.name || 'Location'},
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}>
                {location?.country || 'Country'}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={weatherImage[current?.condition?.text]}
              resizeMode="cover"
              style={{
                width: '60%',
                height: 250,
              }}
            />
          </View>
          {/* degree  */}
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: 30,
              }}>
              {current?.temp_c}°
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 22,
              }}>
              {current?.condition?.text}
            </Text>
          </View>
          {/* other status */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 30,
              marginTop: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <FontAwesome5 name="wind" size={24} color="white" />
              <Text style={{fontSize: 16, color: 'white'}}>
                {current?.wind_kph} km
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Ionicons name="water-outline" size={24} color="white" />
              <Text style={{fontSize: 16, color: 'white'}}>
                {current?.humidity}%
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Feather name="sun" size={24} color="white" />
              <Text style={{fontSize: 16, color: 'white'}}>6:05 AM</Text>
            </View>
          </View>
          {/* forecast */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginLeft: 20,
              marginTop: 40,
            }}>
            <AntDesign name="calendar" size={28} color="#ffff" />
            <Text style={{color: '#ffff', fontSize: 16}}>Daily forecast</Text>
          </View>
          {/* scroll */}
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 20}}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
              {weather?.forecast?.forecastday?.length > 0 ? (
                weather.forecast.forecastday.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      alignItems: 'center',
                      marginTop: 50,
                      height: 140,
                      width: 100,
                      paddingHorizontal: 5,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={weatherImage[item?.day?.condition?.text]}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={{color: 'white'}}>
                      {new Date(item.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                    <Text style={{color: 'white'}}>
                      {item?.day?.avgtemp_c}°
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    height: 140,
                    width: 120,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Search a location to view forecast
                  </Text>
                </View>
              )}

            </View>
          </ScrollView>
        </ImageBackground>

        {/* footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={goToHome} style={styles.iconButton}>
            <AntDesignIcon name="home" size={28} color="#2196F3" />
            <Text style={styles.iconLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToAbout} style={styles.iconButton}>
            <AntDesignIcon name="infocirlceo" size={28} color="#2196F3" />
            <Text style={styles.iconLabel}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToProfile} style={styles.iconButton}>
            {/* <AntDesignIcon name="infocirlceo" size={28} color="#2196F3" /> */}
            <Ionicons name="person-outline" size={28} color="#2196F3" />
            <Text style={styles.iconLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    // paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  searchText: {
    fontSize: 16,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 50,
    justifyContent: 'flex-end',
    width: 50,
    overflow: 'hidden',
  },

  expandedSearch: {
    width: '96%',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 120,
    width: '96%',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    alignSelf: 'center',
  },

  dropdownItem: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
