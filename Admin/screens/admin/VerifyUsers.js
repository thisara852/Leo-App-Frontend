import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserVerification = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', district: 'MD306', status: 'Pending' },
    { id: 2, name: 'Nisal Perera', district: '306A', status: 'Pending' },
    { id: 3, name: 'Sajith Fernando', district: '306B', status: 'Pending' },
    { id: 4, name: 'Amandi Silva', district: '306C', status: 'Pending' },
    { id: 5, name: 'Shehan Kumara', district: '306A1', status: 'Pending' },
  ]);

  const [search, setSearch] = useState('');

  const filteredRequests = requests.filter(req =>
    req.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDecision = (id, decision) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: decision } : req));
    alert(`User ${decision}`);
  };

  return (
    <View style={styles.container}>
      {/* User List */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.district}>District: {item.district}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.approve}
                onPress={() => handleDecision(item.id, 'Approved')}
              >
                <Text style={styles.btnText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reject}
                onPress={() => handleDecision(item.id, 'Rejected')}
              >
                <Text style={styles.btnText}>Reject</Text>
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

  // TOP BAR SPACING FIXED
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,   // 👈 moved icon down
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginLeft: 10, color: '#FFD700'},

  search: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#BAB5B5',
    borderColor: '#ddd',
  },

  card: {
    backgroundColor: '#111',
    padding: 18,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFD70030',
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  district: { fontSize: 14, marginTop: 3, color: '#fff' },
  status: { fontSize: 14, marginTop: 3, color: '#fff' },

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

export default UserVerification;