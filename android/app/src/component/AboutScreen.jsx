import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location } = route.params || {};

  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🌦️ Weather App</Text>
        <Text style={styles.description}>
          This app provides real-time weather updates, forecasts, and location-based weather info. You can search any city worldwide and view the current temperature, weather conditions, and a 7-day forecast.
        </Text>

        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.sectionTitle}>Selected Location:</Text>
            <Text style={styles.feature}>City: {location.name}</Text>
            <Text style={styles.feature}>Country: {location.country}</Text>
          </View>
        )}
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

        <TouchableOpacity onPress={goToProfile} style={styles.iconButton}>
          <Ionicons name="person-outline" size={28} color="#2196F3" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  feature: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
    color: '#555',
  },
  locationInfo: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  iconButton: { alignItems: 'center' },
  iconLabel: { marginTop: 4, fontSize: 12 },
});

export default AboutScreen;
