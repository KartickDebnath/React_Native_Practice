import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message'; // ✅ Import Toast

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async values => {
    try {
      // Get all users from AsyncStorage
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const users = JSON.parse(usersData);

        // Check if the entered username and password match any stored user
        const user = users.find(
          user =>
            user.username === values.username &&
            user.password === values.password,
        );

        if (user) {
          // Store the current user data in case of successful login
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));

          // Navigate to Home screen
          // navigation.replace('Home');
          Toast.show({
            type: 'success',
            text1: 'Login Successfully!',
            text2: 'Please log in to continue.',
          });

          // ✅ Delay navigation to allow toast to be visible
          setTimeout(() => {
            navigation.replace('Home');
          }, 500);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Invalid username or password',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'No Account Found',
          text2: 'Please sign up to continue.',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/loginbackground.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login to continue using the Weather App
        </Text>

        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formBox}>
              <Text style={styles.formTitle}>Log in to your account</Text>

              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#fff"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
                <Text style={styles.link}>New here? Create an account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {flex: 1},
  overlay: {flex: 1, justifyContent: 'center', paddingHorizontal: 24},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {textAlign: 'center', color: '#fff', marginBottom: 30},
  formBox: {
    backgroundColor: 'rgba(14, 12, 12, 0.5)',
    borderRadius: 12,
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {marginTop: 10, fontWeight: '600', color: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    fontSize: 15,
    color: '#fff',
  },
  passwordContainer: {position: 'relative', justifyContent: 'center'},
  eyeIcon: {position: 'absolute', right: 10, top: 14},
  loginButton: {
    backgroundColor: '#B92025',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  link: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  errorText: {color: '#FF6B6B', fontSize: 13, marginTop: 4, marginBottom: 4},
});

export default LoginScreen;
