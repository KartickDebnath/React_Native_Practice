import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignNew from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { WeatherContext } from '../component/WeatherContext';
import { weatherImage } from '../../constants/index.jsx';

const { width, height } = Dimensions.get('window');

const ForecastScreen = () => {
  const navigation = useNavigation();
  const { weather, selectedLocation } = useContext(WeatherContext);

  const today = weather?.forecast?.forecastday?.[0];

  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');
  const goToForecast = () => navigation.navigate('Forecast');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.name}>
            Today's Forecast for {selectedLocation?.name || 'Location'}
          </Text>

          {today ? (
            <View style={styles.card}>
              {/* Weather condition image */}
              <Image
                source={weatherImage[today.day.condition.text]}
                style={styles.conditionImage}
                resizeMode="contain"
              />

              <Text style={styles.date}>
                {new Date(today.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
              <Text style={styles.text}>Avg Temp: {today.day.avgtemp_c}°C</Text>
              <Text style={styles.text}>Condition: {today.day.condition.text}</Text>
              <Text style={styles.text}>Sunrise: {today.astro.sunrise}</Text>
              <Text style={styles.text}>Sunset: {today.astro.sunset}</Text>

              <Text style={styles.hourlyTitle}>Hourly Forecast:</Text>
              {today.hour.map((hourData, index) => (
                <View key={index} style={styles.hourlyCard}>
                  <View style={styles.hourlyRow}>
                    <Image
                      source={weatherImage[hourData.condition.text]}
                      style={styles.hourlyImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.hourText}>
                      {new Date(hourData.time).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {'  '}| Temp: {hourData.temp_c}°C {'  '}| {hourData.condition.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.text}>No forecast data available for today.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={goToHome} style={styles.iconButton}>
          <AntDesignIcon name="home" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToAbout} style={styles.iconButton}>
          <AntDesignIcon name="infocirlceo" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToForecast} style={styles.iconButton}>
          <AntDesignNew name="clockcircleo" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>Forecast</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToProfile} style={styles.iconButton}>
          <Ionicons name="person-outline" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#8c827f',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  hourlyTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  hourlyCard: {
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  hourlyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hourText: {
    fontSize: 13,
    color: '#333',
  },
  conditionImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  hourlyImage: {
    width: 30,
    height: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: height * 0.005,
    fontSize: width * 0.03,
  },
});

export default ForecastScreen;
