import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsNew from 'react-native-vector-icons/Ionicons';
import Ioniconsnotifications from 'react-native-vector-icons/Ionicons';
import IoniconsSignout from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => navigation.navigate('Home');
  const goToAbout = () => navigation.navigate('About');
  const goToProfile = () => navigation.navigate('Profile');

  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [showUnitDetails, setShowUnitDetails] = useState(false);
  const [showCatchmentDetails, setShowCatchmentDetails] = useState(false);
  const [shownotificationsDetails, setShownotificationsDetails] =
    useState(false);

  const toggleMobileDetails = () => setShowMobileDetails(!showMobileDetails);
  const toggleemailDetails = () => setShowEmailDetails(!showEmailDetails);
  const toggleTeamDetails = () => setShowTeamDetails(!showTeamDetails);
  const toggleUnitDetails = () => setShowUnitDetails(!showUnitDetails);
  const toggleCatchmentDetails = () =>
    setShowCatchmentDetails(!showCatchmentDetails);
  const togglenotificationsDetails = () =>
    setShownotificationsDetails(!shownotificationsDetails);

  const handleSignOut = () => {
    navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
  };

  return (
    <View style={styles.container}>
      <ScrollView
        vertical
        // contentContainerStyle={{paddingHorizontal: width * 0.04}}
        // style={{marginTop:40}}
        showsverticalScrollIndicator={false}>
        {/* Profile Info Section */}
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Image
              source={require('../assets/weathernew.jpg')}
              style={styles.avatar}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>UID - KT2503TA</Text>
          </View>
          {/* moblie */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <Feather name="phone" size={24} color="#000" />

              <Text style={styles.mobilename}>Mobile Number</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={toggleMobileDetails}>
                <AntDesign
                  name={showMobileDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {showMobileDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>+91 98765 43210</Text>
              </View>
            )}
          </View>

          {/* email */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <Fontisto name="email" size={24} color="#000" />

              <Text style={styles.mobilename}>Email</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={toggleemailDetails}>
                <AntDesign
                  name={showEmailDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {showEmailDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>abc@gmail.com</Text>
              </View>
            )}
          </View>
          {/* team */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <SimpleLineIcons name="people" size={24} color="#000" />

              <Text style={styles.mobilename}>Team Name</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={toggleTeamDetails}>
                <AntDesign
                  name={showTeamDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {showTeamDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>XYZ</Text>
              </View>
            )}
          </View>
          {/* unit */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <MaterialIcons name="factory" size={24} color="#000" />

              <Text style={styles.mobilename}>Unit Name</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={toggleUnitDetails}>
                <AntDesign
                  name={showUnitDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {showUnitDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>Unit</Text>
              </View>
            )}
          </View>
          {/* catchment */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <IoniconsNew name="location-outline" size={24} color="#000" />

              <Text style={styles.mobilename}>Catchment Area</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={toggleCatchmentDetails}>
                <AntDesign
                  name={showCatchmentDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {showCatchmentDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>Catchment</Text>
              </View>
            )}
          </View>
          {/* notification */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.mobile}>
              <Ioniconsnotifications
                name="notifications-outline"
                size={24}
                color="#000"
              />

              <Text style={styles.mobilename}>Notification</Text>
              <View style={{flex: 1}} />

              <TouchableOpacity onPress={togglenotificationsDetails}>
                <AntDesign
                  name={shownotificationsDetails ? 'down' : 'right'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {shownotificationsDetails && (
              <View style={styles.mobileOpen}>
                <Text style={styles.revealText}>notification</Text>
              </View>
            )}
          </View>
          {/* signout */}
          <TouchableOpacity style={styles.signout} onPress={handleSignOut}>
            <IoniconsSignout name="exit-outline" size={24} color="#000" />
            <Text style={styles.mobilename}>Sign Out</Text>
            <View style={{flex: 1}} />
          </TouchableOpacity>
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
  contentWrapper: {
    alignItems: 'center',
    // marginTop: 50,
  },
  content: {
    // backgroundColor: '#E7F3FF',
    padding: 20,
    // borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    // elevation: 5, // shadow for Android
    // shadowColor: '#000', // shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  mobile: {
    backgroundColor: '#E7F3FF',
    // padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderRadius: 12,
    // alignItems: 'center',
    width: '90%',
    elevation: 5,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 10,
  },
  signout: {
    backgroundColor: '#E7F3FF',
    // padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderRadius: 12,
    // alignItems: 'center',
    width: '90%',
    elevation: 5,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  mobileOpen: {
    backgroundColor: 'rgb(228, 232, 236)',
    // padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderRadius: 12,
    // alignItems: 'center',
    width: '90%',
    elevation: 5,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 10,
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
    color: ' #8c827f ',
  },
  mobilename: {
    fontSize: 20,
    fontWeight: '400',
    // marginBottom: 8,
    color: ' #8c827f ',
  },
  revealText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    // marginTop: 10,
    // marginLeft: 30,
  },
  email: {
    fontSize: 16,
    color: '#8c827f',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
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
    color: '#2196F3',
  },
});

export default ProfileScreen;
