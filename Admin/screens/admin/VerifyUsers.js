import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    StatusBar,
    TextInput,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const VerifyUsers = ({ navigation }) => {
    const [search, setSearch] = useState('');
    
    // Mock Data representing different types of logins
    const [users, setUsers] = useState([
        {
            id: '101',
            name: 'District 306-B1',
            email: 'it.306b1@leo.org',
            type: 'District',
            isVerifiedEmail: true,
            role: 'Webmaster'
        },
        {
            id: '102',
            name: 'Leo Club of Moratuwa',
            email: 'moratuwaleos@leo.org',
            type: 'Club',
            isVerifiedEmail: true,
            role: 'Webmaster'
        },
        {
            id: '103',
            name: 'Saman Kumara',
            email: 'saman99@gmail.com',
            type: 'Regular',
            isVerifiedEmail: false,
            role: 'Member'
        },
        {
            id: '104',
            name: 'Leo Club of Kandy',
            email: 'kandyleos@leo.org',
            type: 'Club',
            isVerifiedEmail: false,
            role: 'Webmaster'
        }
    ]);

    const handleVerify = (id) => {
        Alert.alert("Verification Success", "User account has been officially activated.");
        setUsers(users.filter(u => u.id !== id));
    };

    const renderUser = ({ item }) => {
        const isOfficial = item.type === 'Club' || item.type === 'District';

        return (
            <View style={styles.userCard}>
                <View style={styles.cardInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.userName}>{item.name}</Text>
                        {isOfficial && (
                            <View style={styles.webmasterBadge}>
                                <Text style={styles.webmasterText}>WEBMASTER</Text>
                            </View>
                        )}
                    </View>
                    
                    <Text style={styles.userEmail}>{item.email}</Text>
                    
                    <View style={styles.statusRow}>
                        <View style={[styles.statusIndicator, { backgroundColor: item.isVerifiedEmail ? '#4CAF50' : '#FF4444' }]} />
                        <Text style={styles.statusLabel}>
                            {item.isVerifiedEmail ? 'Email Verified' : 'Email Unverified'}
                        </Text>
                        <Text style={styles.typeLabel}> • {item.type} Account</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.verifyBtn, { opacity: item.isVerifiedEmail ? 1 : 0.6 }]} 
                    onPress={() => handleVerify(item.id)}
                >
                    <Icon name="shield-checkmark" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* TOP HEADER - UPDATED STYLE */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Authority</Text>
                <View style={styles.badgeCount}>
                    <Text style={styles.badgeText}>{users.length}</Text>
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchSection}>
                <View style={styles.searchBox}>
                    <Icon name="search" size={18} color="#666" style={{ marginLeft: 15 }} />
                    <TextInput 
                        placeholder="Search by Email or Name" 
                        placeholderTextColor="#444" 
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <FlatList
                data={users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item.id}
                renderItem={renderUser}
                contentContainerStyle={{ padding: 15 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    
    // Header following ManagePosts style
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
    backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    badgeCount: { backgroundColor: '#FFC700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    badgeText: { color: '#000', fontWeight: 'bold', fontSize: 12 },

    searchSection: { paddingHorizontal: 20, marginBottom: 10 },
    searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', height: 50, borderRadius: 15, borderWidth: 1, borderColor: '#222' },
    input: { flex: 1, color: '#FFF', marginLeft: 10 },

    userCard: { backgroundColor: '#111', borderRadius: 25, padding: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
    cardInfo: { flex: 1 },
    nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    userName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    webmasterBadge: { backgroundColor: '#FFC700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 10 },
    webmasterText: { color: '#000', fontSize: 8, fontWeight: 'bold' },
    userEmail: { color: '#888', fontSize: 13, marginBottom: 10 },
    
    statusRow: { flexDirection: 'row', alignItems: 'center' },
    statusIndicator: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
    statusLabel: { color: '#EEE', fontSize: 11 },
    typeLabel: { color: '#444', fontSize: 11 },

    verifyBtn: { width: 48, height: 48, backgroundColor: '#FFC700', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    emptyText: { color: '#444', textAlign: 'center', marginTop: 50 }
});

export default VerifyUsers;
