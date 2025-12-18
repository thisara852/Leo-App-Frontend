import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Fixed Colors
const PRIMARY_GOLD = '#FFC107';
const DANGER = '#FF4D4D';

const ProfileScreen = ({ setScreen }) => {
  // 🌓 State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  // 🔒 State for Privacy
  const [isPrivate, setIsPrivate] = useState(false);

  // Dynamic Theme Mapping
  const theme = {
    bg: isDarkMode ? '#000000' : '#F3F4F6',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    card: isDarkMode ? '#111111' : '#FFFFFF',
    divider: isDarkMode ? '#1F1F1F' : '#E5E7EB',
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => setScreen('Auth') },
    ]);
  };

  const handleSecurityPress = () => {
    Alert.alert(
      "Security Options",
      "Manage your account security",
      [
        { text: "Change Password", onPress: () => Alert.alert("Reset Link Sent", "Check your email.") },
        { text: "Two-Factor Auth", onPress: () => console.log("2FA Setup") },
        { text: "Close", style: "cancel" }
      ]
    );
  };

  // Internal Component for List Items
  const SettingItem = ({ title, icon, onPress, rightElement, isLast = false }) => (
    <TouchableOpacity 
      style={[
        styles.item, 
        { borderBottomColor: theme.divider, borderBottomWidth: isLast ? 0 : 0.5 }
      ]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#1A1A1A' : '#E5E7EB' }]}>
          <Ionicons name={icon} size={20} color={PRIMARY_GOLD} />
        </View>
        <Text style={[styles.itemText, { color: theme.text }]}>{title}</Text>
      </View>
      {rightElement ? rightElement : <Ionicons name="chevron-forward" size={20} color={theme.subText} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('HomeFeed')}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={DANGER} />
          </TouchableOpacity>
        </View>

        {/* Profile Info Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
          <Image
            source={require('../assets/Leo-District-Logo-306-D3.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={[styles.profileName, { color: theme.text }]}>Leo-D3</Text>
            <Text style={[styles.profileEmail, { color: theme.subText }]}>leo.user@club.lk</Text>
          </View>
          <TouchableOpacity onPress={() => setScreen('EditProfile')}>
            <Ionicons name="pencil" size={18} color={PRIMARY_GOLD} />
          </TouchableOpacity>
        </View>

        {/* --- PREFERENCES SECTION --- */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>PREFERENCES</Text>
        
        <View style={[styles.groupCard, { backgroundColor: theme.card }]}>
          <SettingItem 
            title="Appearance" 
            icon="moon-outline" 
            rightElement={
              <Switch
                trackColor={{ false: "#767577", true: PRIMARY_GOLD }}
                thumbColor="#fff"
                onValueChange={() => setIsDarkMode(!isDarkMode)}
                value={isDarkMode}
              />
            }
          />
          <SettingItem 
            title="Account" 
            icon="person-outline" 
            onPress={() => setScreen('EditProfile')} 
          />
          <SettingItem 
            title="Notifications" 
            icon="notifications-outline" 
            onPress={() => setScreen('Notification')} 
            isLast={true}
          />
        </View>

        {/* --- PRIVACY & SECURITY --- */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>PRIVACY & SECURITY</Text>
        
        <View style={[styles.groupCard, { backgroundColor: theme.card }]}>
          <SettingItem 
            title="Private Account" 
            icon="eye-off-outline" 
            rightElement={
              <Switch
                trackColor={{ false: "#767577", true: PRIMARY_GOLD }}
                thumbColor="#fff"
                onValueChange={() => setIsPrivate(!isPrivate)}
                value={isPrivate}
              />
            }
          />
          <SettingItem 
            title="Security Settings" 
            icon="shield-checkmark-outline" 
            onPress={handleSecurityPress}
            isLast={true}
          />
        </View>

        {/* --- SUPPORT --- */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>SUPPORT</Text>
        <View style={[styles.groupCard, { backgroundColor: theme.card }]}>
          <SettingItem title="Help Center" icon="help-circle-outline" />
          <SettingItem title="About App" icon="information-circle-outline" isLast={true} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  profileCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  profileTextContainer: { flex: 1, marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: 'bold' },
  profileEmail: { fontSize: 14, marginTop: 2 },
  sectionHeader: { fontSize: 12, fontWeight: '800', marginBottom: 8, letterSpacing: 1, marginLeft: 5 },
  groupCard: { borderRadius: 15, paddingHorizontal: 15, marginBottom: 20 },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15 
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { padding: 8, borderRadius: 10 },
  itemText: { fontSize: 16, marginLeft: 12, fontWeight: '500' },
});

export default ProfileScreen;
