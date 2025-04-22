import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Custom validation for mobile or email
const mobileOrEmail = Yup.string()
  .test(
    'is-valid-contact',
    'Enter a valid email or 10-digit mobile number',
    value =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
      /^[0-9]{10}$/.test(value)
  )
  .required('Mobile or Email is required');

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  contact: mobileOrEmail,
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({ navigation }) => {
  const handleSignIn = (values) => {
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={require('../assets/loginbackground.jpg')}
      style={styles.background}
      resizeMode="cover">
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
                keyboardType="email-address"
              />
              {touched.contact && errors.contact && (
                <Text style={styles.errorText}>{errors.contact}</Text>
              )}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
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
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  formBox: {
    backgroundColor: 'rgba(14, 12, 12, 0.5)',
    borderRadius: 12,
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: '#fff',
  },
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
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  loginButton: {
    backgroundColor: '#B92025',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
