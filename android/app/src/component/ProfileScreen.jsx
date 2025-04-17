import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>abc@example.com</Text>
      </View>

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
  container: {flex: 1, justifyContent: 'space-between'},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  iconButton: {alignItems: 'center'},
  iconLabel: {marginTop: 4, fontSize: 12},
});

export default ProfileScreen;
