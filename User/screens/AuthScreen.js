import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';

// --- Custom Icon Component ---
const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT, style }) => {
  let iconName = '';

  switch (name) {
    case 'eye':
      iconName = 'eye-outline';
      break;
    case 'eye-off':
      iconName = 'eye-off-outline';
      break;
    default:
      iconName = 'alert-circle-outline';
  }

  return <Icon name={iconName} size={size} color={color} style={style} />;
};

// --- Input Component ---
const DarkInput = ({ placeholder, isPassword, value, onChangeText, label }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{ width: '100%', marginBottom: 15 }}>
      {label && <Text style={styles.authInputLabel}>{label}</Text>}
      <View style={styles.authInputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? !isPasswordVisible : false}
          style={styles.authInput}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <CustomAppIcon 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- Login Form ---
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (username.length > 0 && password.length > 5) {
      onLogin({ username, rememberMe }); 
    } else {
      Alert.alert('Login Failed', 'Please enter a valid username and password.');
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <DarkInput
        label="Username :"
        placeholder="Enter your Username"
        value={username}
        onChangeText={setUsername}
      />
      <DarkInput
        label="Password :"
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />

      <View style={styles.rowBetween}>
        <TouchableOpacity 
          style={styles.rememberMeContainer} 
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Icon 
            name={rememberMe ? "checkbox" : "square-outline"} 
            size={20} 
            color={PRIMARY_GOLD} 
          />
          <Text style={styles.rememberMeText}>Remember Username</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      <GoldButton onPress={handleLogin} style={styles.loginButton}>
        Login
      </GoldButton>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* UPDATED GOOGLE BUTTON */}
      <TouchableOpacity style={styles.googleButton}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png' }} 
          style={styles.googleIcon} 
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Signup Form ---
const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.authFormContainer}>
      <DarkInput label="Username :" placeholder="Enter your Username" value={username} onChangeText={setUsername} />
      <DarkInput label="Email :" placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <DarkInput label="Create Password :" placeholder="Enter Password" value={password} onChangeText={setPassword} isPassword={true} />
      <DarkInput label="Confirm Password :" placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} isPassword={true} />
      <GoldButton onPress={onSignup} style={styles.signupButton}>Signup</GoldButton>
    </View>
  );
};

// --- Main Auth Screen ---
const AuthScreen = ({ onLoginSuccess, onSignupSuccess }) => {
  const [activeTab, setActiveTab] = useState('Login');

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/logo.png')} style={styles.authLogoSmall} />
        <Text style={styles.authLogoText}>LeoConnect- Webmaster</Text>

        <View style={styles.authTabSwitcher}>
          <TouchableOpacity style={styles.authTabItem} onPress={() => setActiveTab('Login')}>
            <Text style={[styles.authTabText, activeTab === 'Login' && styles.authTabTextActive]}>Login</Text>
            {activeTab === 'Login' && <View style={styles.authTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.authTabItem} onPress={() => setActiveTab('Signup')}>
            <Text style={[styles.authTabText, activeTab === 'Signup' && styles.authTabTextActive]}>Signup</Text>
            {activeTab === 'Signup' && <View style={styles.authTabIndicator} />}
          </TouchableOpacity>
        </View>

        {activeTab === 'Login' ? <LoginForm onLogin={onLoginSuccess} /> : <SignupForm onSignup={onSignupSuccess} />}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Button Component ---
const GoldButton = ({ children, onPress, style, disabled = false }) => (
  <TouchableOpacity onPress={onPress} style={[styles.goldButton, disabled && styles.disabledButton, style]} disabled={disabled}>
    <Text style={styles.goldButtonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  authContainer: { flex: 1, backgroundColor: BG_DARK },
  scrollContent: { flexGrow: 1, paddingVertical: 20, alignItems: 'center' },
  authLogoSmall: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 15 },
  authLogoText: { fontSize: 28, fontWeight: 'bold', color: PRIMARY_GOLD, marginBottom: 25 },
  authTabSwitcher: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#333', width: '80%' },
  authTabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  authTabText: { color: INACTIVE_TAB_COLOR, fontSize: 16 },
  authTabTextActive: { color: PRIMARY_GOLD, fontWeight: 'bold' },
  authTabIndicator: { height: 3, width: '100%', backgroundColor: PRIMARY_GOLD, marginTop: 5 },
  authFormContainer: { width: '80%', marginTop: 20 },
  authInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 8, paddingHorizontal: 10 },
  authInputLabel: { color: TEXT_LIGHT, marginBottom: 5 },
  authInput: { flex: 1, color: TEXT_LIGHT, height: 45 },
  goldButton: { backgroundColor: PRIMARY_GOLD, paddingVertical: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  goldButtonText: { color: '#000', fontWeight: 'bold' },
  loginButton: { marginTop: 10 },
  signupButton: { marginTop: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center' },
  rememberMeText: { color: TEXT_LIGHT, fontSize: 12, marginLeft: 5 },
  forgotPasswordText: { color: PRIMARY_GOLD, fontSize: 12 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: '#333' },
  dividerText: { color: '#6B7280', paddingHorizontal: 10, fontSize: 12 },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_GOLD, // Gold background
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  googleButtonText: { color: '#000', fontWeight: 'bold' },
});

export default AuthScreen;
