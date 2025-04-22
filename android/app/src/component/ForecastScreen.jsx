import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ForecastScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');
  const goToForecast = () => navigation.navigate('Forecast');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* You can put your forecast content here */}
        <View style={styles.content}>
          <Text style={styles.name}>Forecast Information</Text>
          {/* Add your forecast data here */}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
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
    marginBottom: 8,
    color: '#8c827f',
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
