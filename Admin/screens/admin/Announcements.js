import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    Alert,
    StatusBar,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Announcements = ({ navigation }) => {
    const [newMsg, setNewMsg] = useState('');
    const [announcements, setAnnouncements] = useState([
        {
            id: '1',
            text: 'Official: The Annual Leo Conference will be held on Jan 20th.',
            date: 'Today, 10:30 AM',
            status: 'Active'
        },
        {
            id: '2',
            text: 'System Maintenance: The app will be down for 2 hours tonight.',
            date: 'Yesterday',
            status: 'Pending'
        }
    ]);

    const handlePost = () => {
        if (newMsg.trim().length < 5) {
            Alert.alert("Error", "Announcement is too short!");
            return;
        }
        const entry = {
            id: Date.now().toString(),
            text: newMsg,
            date: 'Just now',
            status: 'Pending'
        };
        setAnnouncements([entry, ...announcements]);
        setNewMsg('');
        Alert.alert("Success", "Announcement drafted for review.");
    };

    const handleDelete = (id) => {
        Alert.alert("Delete", "Remove this announcement?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => setAnnouncements(announcements.filter(a => a.id !== id)) }
        ]);
    };

    const handleApprove = (id) => {
        setAnnouncements(announcements.map(a => 
            a.id === id ? { ...a, status: 'Active' } : a
        ));
        Alert.alert("Live", "Announcement is now visible to all members.");
    };

    const renderAnnouncement = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.statusTag, { backgroundColor: item.status === 'Active' ? '#4CAF5020' : '#FFC70020' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Active' ? '#4CAF50' : '#FFC700' }]}>
                        {item.status.toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            
            <Text style={styles.msgText}>{item.text}</Text>

            <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
                    <Icon name="trash-outline" size={20} color="#FF4444" />
                </TouchableOpacity>
                
                {item.status === 'Pending' && (
                    <TouchableOpacity onPress={() => handleApprove(item.id)} style={styles.approveBtn}>
                        <Icon name="checkmark-done" size={18} color="#000" />
                        <Text style={styles.approveText}>Publish</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* TOP HEADER (Matches ManagePosts/VerifyUsers) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Global Broadcast</Text>
                <View style={styles.badgeCount}>
                    <Text style={styles.badgeText}>{announcements.length}</Text>
                </View>
            </View>

            {/* CREATE ANNOUNCEMENT */}
            <View style={styles.inputSection}>
                <Text style={styles.sectionLabel}>Create New Announcement</Text>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Type official message here..."
                        placeholderTextColor="#444"
                        multiline
                        value={newMsg}
                        onChangeText={setNewMsg}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={handlePost}>
                        <Icon name="send" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* LIST */}
            <FlatList 
                data={announcements}
                keyExtractor={item => item.id}
                renderItem={renderAnnouncement}
                contentContainerStyle={{ padding: 20 }}
                ListHeaderComponent={<Text style={styles.sectionLabel}>Recent History</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
    backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badgeCount: { backgroundColor: '#FFC700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    badgeText: { color: '#000', fontWeight: 'bold', fontSize: 12 },

    inputSection: { padding: 20, backgroundColor: '#0A0A0A', borderBottomWidth: 1, borderBottomColor: '#111' },
    sectionLabel: { color: '#444', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
    inputWrapper: { flexDirection: 'row', backgroundColor: '#111', borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#222' },
    input: { flex: 1, color: '#FFF', paddingHorizontal: 10, fontSize: 14, minHeight: 60, textAlignVertical: 'top' },
    sendBtn: { width: 50, height: 50, backgroundColor: '#FFC700', borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },

    card: { backgroundColor: '#111', borderRadius: 25, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1A1A1A' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 9, fontWeight: 'bold' },
    dateText: { color: '#444', fontSize: 11 },
    msgText: { color: '#CCC', fontSize: 14, lineHeight: 22 },
    
    actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, gap: 10 },
    actionBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FF444410', justifyContent: 'center', alignItems: 'center' },
    approveBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFC700', paddingHorizontal: 15, borderRadius: 12, gap: 5 },
    approveText: { color: '#000', fontWeight: 'bold', fontSize: 12 }
});

export default Announcements;
