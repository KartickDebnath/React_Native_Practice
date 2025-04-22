import React, { useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    // Proceed with login logic (e.g., navigation)
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={require('../assets/loginbackground.jpg')}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login to continue using the Weather App
        </Text>

        <Formik
          initialValues={{ username: '', password: '' }}
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
                style={styles.passwordInput}
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
                  style={styles.passwordInput}
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
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.optionsRow}>
                <Text style={styles.rememberText}>Remember Me</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
                <Text style={styles.link}>New here? Create an account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   paddingHorizontal: 12,
  //   paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  //   marginTop: 6,
  //   fontSize: 15,
  //   color: '#fff',
  // },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginTop: 6,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 40, // extra space to prevent overlap with eye icon
    fontSize: 15,
    color: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  rememberText: {
    fontSize: 13,
    color: '#fff',
  },
  forgotText: {
    fontSize: 13,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#B92025',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
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
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
});

export default LoginScreen;
