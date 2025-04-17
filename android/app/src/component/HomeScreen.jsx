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
  Dimensions,
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

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');

  const [search, setSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setweather] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLocations = loc => {
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
      .catch(() => setLoading(false));
  };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocation({name: value}).then(data => {
        setLocations(data || []);
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
        source={require('../assets/weathernew.jpg')}
        style={styles.background}
        resizeMode="cover">
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            <View style={styles.content}>
              <View style={styles.searchBoxWrapper}>
                <View style={[styles.searchContainer, search && styles.expandedSearch]}>
                  {search ? (
                    <TextInput
                      style={styles.searchInput}
                      onChangeText={handleTextDebounce}
                      placeholder="Search"
                      placeholderTextColor="#888"
                      autoFocus
                    />
                  ) : null}
                  <TouchableOpacity onPress={() => setSearch(!search)} style={{paddingVertical: height * 0.01}}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {locations.length > 0 && search && (
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
                            paddingVertical: height * 0.008,
                          }}>
                          <Ionicons name="location-outline" size={24} color="#000" />
                          <Text style={styles.dropdownItem}>
                            {loc?.name}, {loc?.country}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>

              <View style={styles.locationBox}>
                <Text style={styles.locationText}>{location?.name || 'Location'},</Text>
                <Text style={styles.locationText}>{location?.country || 'Country'}</Text>
              </View>
            </View>

            <View style={styles.weatherIconBox}>
              <Image
                source={weatherImage[current?.condition?.text]}
                resizeMode="contain"
                style={styles.weatherIcon}
              />
            </View>

            <View style={{marginTop: height * 0.02}}>
              <Text style={styles.tempText}>{current?.temp_c || 'Temperature'}°C</Text>
              <Text style={styles.conditionText}>{current?.condition?.text}</Text>
            </View>

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
                  {weather?.forecast?.forecastday?.[0]?.astro?.sunset}
                </Text>
              </View>
            </View>

            <View style={styles.forecastLabel}>
              <AntDesign name="calendar" size={28} color="#fff" />
              <Text style={styles.forecastLabelText}>Daily forecast</Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: width * 0.04}}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: height * 0.02}}>
              <View style={{flexDirection: 'row', gap: width * 0.03}}>
                {weather?.forecast?.forecastday?.length > 0 ? (
                  weather.forecast.forecastday.map((item, index) => {
                    const isToday = item.date === new Date().toISOString().split('T')[0];
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
                        <Text style={styles.forecastCardText}>
                          {new Date(item.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </Text>
                        <Text style={styles.forecastCardText}>
                          {isToday ? current?.temp_c : item?.day?.avgtemp_c}°C
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.forecastEmptyCard}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Search a location to view forecast</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </>
        )}
      </ImageBackground>

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
          <Ionicons name="person-outline" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { paddingHorizontal: width * 0.05, paddingTop: height * 0.06 },
  searchBoxWrapper: { alignItems: 'flex-end', position: 'relative' },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
  },
  expandedSearch: { width: '100%' },
  searchInput: {
    flex: 1,
    fontSize: width * 0.04,
    paddingVertical: height * 0.01,
    color: '#000', // Ensures visibility on all devices
  },
  dropdownContainer: {
    backgroundColor: 'white',
    padding: width * 0.04,
    borderRadius: 10,
    position: 'absolute',
    top: height * 0.07,
    width: '100%',
    zIndex: 20,
  },
  dropdownItem: { fontSize: width * 0.04, marginLeft: width * 0.02 },
  locationBox: { marginTop: height * 0.03, flexDirection: 'row', justifyContent: 'center' },
  locationText: { color: 'white', fontSize: width * 0.045, fontWeight: 'bold', marginHorizontal: width * 0.01 },
  weatherIconBox: { justifyContent: 'center', alignItems: 'center', marginTop: height * 0.02 },
  weatherIcon: { width: width * 0.6, height: height * 0.2 },
  tempText: { textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: width * 0.09 },
  conditionText: { textAlign: 'center', color: 'white', fontSize: width * 0.045 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: height * 0.02 },
  statsItem: { flexDirection: 'row', alignItems: 'center', gap: width * 0.01 },
  statsText: { fontSize: width * 0.035, color: 'white' },
  forecastLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
  },
  forecastLabelText: { color: '#fff', fontSize: width * 0.04 },
  forecastCard: {
    backgroundColor: 'rgba(15, 15, 15, 0.7)',
    alignItems: 'center',
    marginTop: height * 0.04,
    height: height * 0.15,
    width: width * 0.25,
    padding: width * 0.02,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  forecastCardText: { color: 'white', textAlign: 'center', fontSize: width * 0.035 },
  forecastImage: { width: width * 0.13, height: height * 0.07, resizeMode: 'contain' },
  forecastEmptyCard: {
    backgroundColor: 'rgba(15, 15, 15, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.04,
    height: height * 0.18,
    width: width * 0.3,
    paddingHorizontal: width * 0.04,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.015,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  iconButton: { alignItems: 'center' },
  iconLabel: { marginTop: height * 0.005, fontSize: width * 0.03 },
});

export default HomeScreen;
