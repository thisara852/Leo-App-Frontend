import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert, Modal 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const COLORS = {
  primary: '#FFC72C',
  background: '#000000',
  text: '#FFFFFF',
  textFaded: '#A9A9A9',
  card: '#1A1A1A',
};

const EditProfileScreen = ({ setScreen }) => {
  const [name, setName] = useState('Amali Jayasingha');
  const [about, setAbout] = useState('');
  const [club, setClub] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSave = () => {
    Alert.alert("Saved", "Profile updated successfully!", [
      { text: "OK", onPress: () => setScreen('HomeFeed') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        {/* FIXED: Connects back arrow to HomeFeed */}
        <TouchableOpacity onPress={() => setScreen('HomeFeed')} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.editScrollContent}>
        <View style={styles.imageEditContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=5' }} 
            style={styles.profileImageLarge}
          />
          <TouchableOpacity 
            style={styles.editIconContainer} 
            onPress={() => setIsModalVisible(true)}
          >
            <Feather name="edit-3" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={COLORS.textFaded} />

        <Text style={styles.label}>About:</Text>
        <TextInput style={[styles.input, styles.textArea]} multiline value={about} onChangeText={setAbout} placeholder="Tell us about yourself..." placeholderTextColor={COLORS.textFaded} />

        <Text style={styles.label}>Club:</Text>
        <TextInput style={styles.input} value={club} onChangeText={setClub} placeholder="Club Name" placeholderTextColor={COLORS.textFaded} />

        <Text style={styles.label}>Year:</Text>
        <TextInput style={styles.input} value={year} onChangeText={setYear} placeholder="Example: 2023/24" placeholderTextColor={COLORS.textFaded} />

        <Text style={styles.label}>Role:</Text>
        <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="e.g. President" placeholderTextColor={COLORS.textFaded} />

        <TouchableOpacity style={styles.saveButtonCentered} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 40 },
  editScrollContent: { padding: 20, paddingBottom: 50 },
  headerBar: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.card },
  backButton: { position: "absolute", left: 15, top: 12, zIndex: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  profileImageLarge: { width: 120, height: 120, borderRadius: 60 },
  imageEditContainer: { alignSelf: "center", marginVertical: 20 },
  editIconContainer: { position: "absolute", bottom: 0, right: 0, backgroundColor: COLORS.primary, padding: 8, borderRadius: 20 },
  label: { color: COLORS.text, fontSize: 14, marginTop: 15, fontWeight: '600' },
  input: { backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 12, color: COLORS.text, marginTop: 5 },
  textArea: { height: 100, textAlignVertical: "top" },
  saveButtonCentered: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 8, alignItems: "center", marginTop: 40 },
  saveButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});

export default EditProfileScreen;
