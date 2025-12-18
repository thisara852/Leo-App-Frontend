import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'New Event', description: 'Annual sports meet', author: 'Admin', date: '2025-12-12', likes: 10, image: null },
    { id: 2, title: 'Holiday Notice', description: 'School closed tomorrow', author: 'Admin', date: '2025-12-10', likes: 25, image: null },
    { id: 3, title: 'Exam Schedule', description: 'Final exams start next week', author: 'Admin', date: '2025-12-08', likes: 15, image: null },
  ]);

  const [search, setSearch] = useState('');

  const filteredAnnouncements = announcements.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
    alert('Announcement deleted');
  };

  return (
    <View style={styles.container}>
      {/* Announcement List */}
      <FlatList
        data={filteredAnnouncements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.district}>Author: {item.author}</Text>
            <Text style={styles.status}>Date: {item.date} | Likes: {item.likes}</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.approve} onPress={() => alert('Liked!')}>
                <Text style={styles.btnText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reject} onPress={() => handleDelete(item.id)}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginLeft: 10, color: '#FFD700' },

  search: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#222',
    borderColor: '#555',
    color: '#fff',
  },

  card: {
    backgroundColor: '#111',
    padding: 18,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD70030',
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: { fontSize: 18, fontWeight: 'bold', color: '#FFD700' },
  description: { fontSize: 14, marginTop: 3, color: '#fff' },
  district: { fontSize: 12, marginTop: 3, color: '#ccc' },
  status: { fontSize: 12, marginTop: 3, color: '#ccc' },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  approve: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  reject: {
    backgroundColor: '#BAB5B5',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  btnText: { color: '#000', fontWeight: 'bold' },
});

export default Announcements;
