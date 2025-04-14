import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchOutlined} from '@ant-design/icons';

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/weather.jpg')} // Adjust this path as needed
        style={styles.background}
        resizeMode="cover">
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>Search here...</Text>
            <Ionicons name="search-outline" size={24} color="#000" />
          </View>
        </View>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginTop:20
        }}>
          <Text style={{
            fontSize:24,
            color:'white',
            fontWeight:500,
          }}>Kolkata</Text>
          {/* <Text style={{
            fontSize:24,
            color:'white',
            fontWeight:500,
          }}>Hi ami Sutanu Da,dekhchilm ki korcho</Text> */}
        </View>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginTop:20,
        }}>
          <Image
          source={require('../assets/cloud.png')}
          resizeMode='cover'
          style={{
            width: '90%',
            height: 300, // adjust as needed
          }}
          />
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  background: {
    flex: 1,
    // justifyContent: 'center',
  },
  // content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20},
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 50,
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchText: {
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
