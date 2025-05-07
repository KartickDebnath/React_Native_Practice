import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  contact: Yup.string()
    .test(
      'is-valid-contact',
      'Enter a valid email or 10-digit mobile number',
      value =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{10}$/.test(value),
    )
    .required('Contact is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async values => {
    try {
      const response = await fetch('http://192.168.0.135:3000/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.username,
          mobile: values.contact,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Network Error', error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/loginbackground.jpg')} style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to use the Weather App</Text>

        <Formik
          initialValues={{ username: '', contact: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={handleSignIn}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formBox}>
              <Text style={styles.formTitle}>Sign in with your details</Text>

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

              <Text style={styles.label}>Mobile Number or Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile or email"
                placeholderTextColor="#fff"
                onChangeText={handleChange('contact')}
                onBlur={handleBlur('contact')}
                value={values.contact}
              />
              {touched.contact && errors.contact && (
                <Text style={styles.errorText}>{errors.contact}</Text>
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
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.link}>Already have an account? Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
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
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginTop: 6,
    fontSize: 15,
    color: '#fff',
  },
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
  passwordContainer: {position: 'relative', justifyContent: 'center'},
  eyeIcon: {position: 'absolute', right: 10, top: 14},
});

export default SignInScreen;
