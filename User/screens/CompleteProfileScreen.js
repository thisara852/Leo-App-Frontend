// screens/CompleteProfileScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar as RNStatusBar,
  StyleSheet,
  Alert
} from 'react-native';
// ✅ Using Expo-compatible icons
import { Ionicons } from '@expo/vector-icons'; 

// --- Constants (Matching your project theme) ---
const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';
const SECONDARY_DARK = '#1F1F1F';

// --- Internal Components (Replacing missing imports for standalone stability) ---
const DarkInput = ({ label, placeholder, value, onChangeText }) => (
  <View style={{ width: '100%', marginBottom: 15 }}>
    {label && <Text style={{ color: TEXT_LIGHT, marginBottom: 5 }}>{label}</Text>}
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 8, paddingHorizontal: 10 }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, color: TEXT_LIGHT, height: 45 }}
      />
    </View>
  </View>
);

const CompleteProfileScreen = ({ setScreen }) => {
  const [club, setClub] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');

  const handleSave = () => {
    if (club.trim() && year.trim() && role.trim()) {
      setScreen('HomeFeed');
    } else {
      Alert.alert('Incomplete Profile', 'Please fill in all details to continue.');
    }
  };

  // ✅ FIX: Using a placeholder URI to prevent "File Not Found" crashes. 
  // Replace the URI with require('../assets/profile.webp') once the file exists.
  const profileImage = { uri: 'https://via.placeholder.com/150/1A1A1A/FFC107?text=Leo' };

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setScreen('Auth')} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={28} color={TEXT_LIGHT} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
        </View>
        
        <Text style={styles.headerSubtitle}>
          Help us personalize your experience
        </Text>

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={profileImage} 
              style={styles.avatarImage}
            />
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.7}>
              <Ionicons name="pencil" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Inputs (Replacing with standard View/TextInput to ensure it runs) */}
        <Text style={styles.inputLabel}>Enter Club :</Text>
        <View style={styles.inputBox}>
          <TextInput 
            style={styles.textInput} 
            placeholder="Enter your club name" 
            placeholderTextColor="#666"
            value={club}
            onChangeText={setClub}
          />
        </View>

        <Text style={styles.inputLabel}>Year :</Text>
        <View style={styles.inputBox}>
          <TextInput 
            style={styles.textInput} 
            placeholder="Select your year" 
            placeholderTextColor="#666"
            value={year}
            onChangeText={setYear}
          />
        </View>

        <Text style={styles.inputLabel}>LEO Club Role :</Text>
        <View style={styles.inputBox}>
          <TextInput 
            style={styles.textInput} 
            placeholder="Select your LEO club role" 
            placeholderTextColor="#666"
            value={role}
            onChangeText={setRole}
          />
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.goldButton}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// Required for the inline TextInputs
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_DARK },
  scrollContainer: { paddingHorizontal: 25, paddingVertical: 20, paddingBottom: 50 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: TEXT_LIGHT },
  headerSubtitle: { fontSize: 14, color: INACTIVE_TAB_COLOR, marginBottom: 20, paddingLeft: 38 },
  avatarContainer: { alignItems: 'center', marginVertical: 30 },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: SECONDARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#333'
  },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  editBadge: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundColor: PRIMARY_GOLD, 
    padding: 8, 
    borderRadius: 20, 
    borderWidth: 3, 
    borderColor: BG_DARK 
  },
  inputLabel: { color: TEXT_LIGHT, marginBottom: 8, marginTop: 15, fontWeight: '500' },
  inputBox: { 
    backgroundColor: '#111', 
    borderWidth: 1, 
    borderColor: '#333', 
    borderRadius: 8, 
    paddingHorizontal: 15 
  },
  textInput: { color: '#FFF', height: 50 },
  goldButton: { 
    backgroundColor: PRIMARY_GOLD, 
    height: 55, 
    borderRadius: 10, 
    marginTop: 40, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});

export default CompleteProfileScreen;
