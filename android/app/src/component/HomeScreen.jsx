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
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {debounce} from 'lodash';
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
  const [loading, setLoading] = useState(false);

  const handleLocations = loc => {
    console.log('locations', loc);
    setLocations([]);
    setSearch(false);
    setLoading(true);

    fetchWeatherForecast({
      name: loc.name,
      days: 7,
    })
      .then(data => {
        setTimeout(() => {
          setweather(data);
          setLoading(false);
        }, 500);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
    <>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}
        resizeMode="cover">
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            {/* SEARCH */}
            <View style={styles.content}>
              <View style={styles.searchBoxWrapper}>
                <View
                  style={[
                    styles.searchContainer,
                    search && styles.expandedSearch,
                  ]}>
                  {search ? (
                    <TextInput
                      style={styles.searchInput}
                      onChangeText={handleTextDebounce}
                      placeholder="Search"
                      autoFocus
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => setSearch(!search)}
                    style={{paddingVertical: 10}}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

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
                            {loc?.name}, {loc?.country}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}
              </View>

              {/* LOCATION */}
              <View style={styles.locationBox}>
                <Text style={styles.locationText}>
                  {location?.name || 'Location'},
                </Text>
                <Text style={styles.locationText}>
                  {location?.country || 'Country'}
                </Text>
              </View>
            </View>

            {/* WEATHER ICON */}
            <View style={styles.weatherIconBox}>
              <Image
                source={weatherImage[current?.condition?.text]}
                resizeMode="cover"
                style={{width: '60%', height: 250}}
              />
            </View>

            {/* TEMP */}
            <View style={{marginTop: 20}}>
              <Text style={styles.tempText}>{current?.temp_c}°</Text>
              <Text style={styles.conditionText}>
                {current?.condition?.text}
              </Text>
            </View>

            {/* STATS */}
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <FontAwesome5 name="wind" size={24} color="white" />
                <Text style={styles.statsText}>{current?.wind_kph} km</Text>
              </View>
              <View style={styles.statsItem}>
                <Ionicons name="water-outline" size={24} color="white" />
                <Text style={styles.statsText}>{current?.humidity}%</Text>
              </View>
              <View style={styles.statsItem}>
                <Feather name="sun" size={24} color="white" />
                <Text style={styles.statsText}>
                  {' '}
                  {weather?.forecast?.forecastday?.[0]?.astro?.sunset}
                </Text>
              </View>
            </View>

            {/* DAILY FORECAST */}
            <View style={styles.forecastLabel}>
              <AntDesign name="calendar" size={28} color="#fff" />
              <Text style={{color: '#fff', fontSize: 16}}>Daily forecast</Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 20}}>
              <View style={{flexDirection: 'row', gap: 15}}>
                {weather?.forecast?.forecastday?.length > 0 ? (
                  weather.forecast.forecastday.map((item, index) => {
                    const isToday =
                      item.date === new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
                    return (
                      <View key={index} style={styles.forecastCard}>
                        <Image
                          source={
                            isToday
                              ? weatherImage[current?.condition?.text]
                              : weatherImage[item?.day?.condition?.text]
                          }
                          style={styles.forecastImage}
                        />
                        <Text style={{color: 'white'}}>
                          {new Date(item.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </Text>
                        <Text style={{color: 'white'}}>
                          {isToday ? current?.temp_c : item?.day?.avgtemp_c}°
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.forecastEmptyCard}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Search a location to view forecast
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </>
        )}
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
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  searchBoxWrapper: {
    alignItems: 'flex-end',
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  expandedSearch: {
    width: '100%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 10,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 60,
    width: '100%',
    zIndex: 20,
  },
  dropdownItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  locationBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  weatherIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  tempText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  conditionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 20,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statsText: {
    fontSize: 16,
    color: 'white',
  },
  forecastLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 20,
    marginTop: 40,
  },
  forecastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    marginTop: 50,
    height: 140,
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  forecastImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  forecastEmptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    height: 140,
    width: 120,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
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
});

export default HomeScreen;
