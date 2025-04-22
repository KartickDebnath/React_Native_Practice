import React , {useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignNew from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WeatherContext } from '../component/WeatherContext';


const { width, height } = Dimensions.get('window');

const ForecastScreen = () => {
  // const navigation = useNavigation();
  const route = useRoute();
  const navigation = useNavigation();
  const { weather, selectedLocation } = useContext(WeatherContext); // 👈 Use context

  const forecast = weather?.forecast?.forecastday || [];
  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');
  const goToForecast = () => navigation.navigate('Forecast');
  // const { selectedLocation } = useContext(WeatherContext);

  return (
    <View style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.name}>7-Day Forecast for {selectedLocation?.name || 'Location'}</Text>
          {forecast.length > 0 ? (
            forecast.map((day, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.date}>
                  {new Date(day.date).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  })}
                </Text>
                <Text style={styles.text}>Avg Temp: {day.day.avgtemp_c}°C</Text>
                <Text style={styles.text}>Condition: {day.day.condition.text}</Text>
                <Text style={styles.text}>Sunrise: {day.astro.sunrise}</Text>
                <Text style={styles.text}>Sunset: {day.astro.sunset}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No forecast data available.</Text>
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
    textAlign: 'center'
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
