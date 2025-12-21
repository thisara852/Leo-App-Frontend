import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const COLORS = { 
  primary: '#FFC72C', 
  background: '#000000', 
  text: '#FFFFFF', 
  card: '#1A1A1A',
  border: '#333'
};

export default function ProfileScreen({ setScreen }) {
  // --- Updated Data with actual images ---
  const profileData = {
    name: "Amali Jayasingha",
    memberSince: "2022",
    description: "Dedicated and motivated Leo member focused on leadership and community service.",
    // Replace these placeholder URLs with your actual image links
    savedPosts: [
      { uri: 'https://picsum.photos/id/10/400/400' }, 
      { uri: 'https://picsum.photos/id/20/400/400' },
      { uri: 'https://picsum.photos/id/30/400/400' },
      { uri: 'https://picsum.photos/id/40/400/400' }
    ]
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => setScreen('HomeFeed')} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info Section */}
        <View style={styles.headerCenterAligned}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=5' }} style={styles.profileImage} />
          <View style={styles.memberBadge}><Text style={styles.memberBadgeText}>Member</Text></View>
          <Text style={styles.nameText}>{profileData.name}</Text>
          <Text style={styles.yearText}>{profileData.memberSince}</Text>
          
          {/* Badge Icons */}
          <View style={styles.badgeContainer}>
            <View style={styles.circleBadge} />
            <View style={styles.circleBadge} />
            <View style={styles.circleBadge} />
          </View>
        </View>

        <Text style={styles.descriptionText}>{profileData.description}</Text>

        {/* Saved Section Header */}
        <View style={styles.savedHeader}>
          <Text style={styles.savedTitle}>Saved</Text>
          <TouchableOpacity onPress={() => setScreen('EditProfile')}>
            <Text style={styles.editProfileText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- Image Grid Section --- */}
        <View style={styles.savedGridVertical}>
          {profileData.savedPosts.map((img, idx) => (
            <View key={idx} style={styles.savedPostCard}>
              <Image 
                source={img} 
                style={styles.savedImage} 
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 40 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  headerBar: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.card 
  },
  backButton: { position: "absolute", left: 15, top: 12, zIndex: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  headerCenterAligned: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  memberBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15, marginTop: 10 },
  memberBadgeText: { color: "#000", fontSize: 12, fontWeight: "bold" },
  nameText: { fontSize: 24, color: COLORS.text, fontWeight: "bold", marginTop: 10 },
  yearText: { fontSize: 16, color: COLORS.primary, marginBottom: 15 },
  badgeContainer: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  circleBadge: { width: 45, height: 45, borderRadius: 25, borderWidth: 1, borderColor: COLORS.primary },
  descriptionText: { color: COLORS.text, textAlign: 'center', lineHeight: 20, marginBottom: 30, paddingHorizontal: 10 },
  savedHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: 'center' },
  savedTitle: { fontSize: 18, color: COLORS.text, fontWeight: "bold" },
  editProfileText: { color: COLORS.primary, fontSize: 14 },
  
  // Grid Styles for Images
  savedGridVertical: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  savedPostCard: { 
    width: "48%", 
    aspectRatio: 1, 
    borderRadius: 12, 
    overflow: "hidden", 
    marginBottom: 15, 
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  savedImage: { width: "100%", height: "100%" },
});
