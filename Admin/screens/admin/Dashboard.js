import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AuthorityDashboard = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* HEADER */}
            <View style={styles.topHeader}>
                <View style={styles.adminIdentity}>
                    <View style={styles.avatarGlow}>
                        <Icon name="shield-half" size={24} color="#000" />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={styles.adminRole}>System Authority</Text>
                        <Text style={styles.adminName}>Admin Panel</Text>
                    </View>
                </View>
                <View style={styles.systemStatus}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Live</Text>
                </View>
            </View>

            {/* SEARCH */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color="#666" style={{ marginLeft: 15 }} />
                    <TextInput
                        placeholder="Search Leo ID, Post, or Club..."
                        placeholderTextColor="#666"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                
                {/* STATS */}
                <View style={styles.statsGrid}>
                    <StatBox label="Pending" value="12" icon="person-add" color="#FFC700" sub="Users" />
                    <StatBox label="Flagged" value="04" icon="flag" color="#FF4444" sub="Posts" />
                    <StatBox label="Districts" value="15" icon="map" color="#FFF" sub="Active" />
                </View>

                <Text style={styles.sectionTitle}>Main Operations</Text>
                <View style={styles.commandRow}>
                    <CommandButton 
                        title="Verify Users" 
                        icon="shield-checkmark" 
                        onPress={() => navigation.navigate('VerifyUsers')} 
                        badge="12"
                    />
                    <CommandButton 
                        title="Reported Issues" 
                        icon="alert-circle" 
                        onPress={() => navigation.navigate('ReportedIssues')} 
                        badge="4"
                        isCritical={true} 
                    />
                </View>
                <View style={styles.commandRow}>
                    <CommandButton 
                        title="Announcements" 
                        icon="megaphone" 
                        onPress={() => navigation.navigate('Announcements')} 
                    />
                    <CommandButton 
                        title="Manage Posts" 
                        icon="layers" 
                        onPress={() => navigation.navigate('ManagePosts')} 
                    />
                </View>

                <Text style={styles.sectionTitle}>System Management</Text>
                
                <TouchableOpacity 
                    style={styles.moduleCard}
                    onPress={() => navigation.navigate('Structure')}
                >
                    <View style={styles.moduleIcon}>
                        <Icon name="business" size={22} color="#FFC700" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={styles.moduleTitle}>District & Club Structure</Text>
                        <Text style={styles.moduleDesc}>Configure the organizational hierarchy.</Text>
                    </View>
                    <Icon name="chevron-forward" size={18} color="#333" />
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Priority Alerts</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AlertsPage')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AlertsPage')}>
                    <AlertCard 
                        title="Security: Unusual Login"
                        desc="Admin login detected from unrecognized IP."
                        time="Just now"
                        type="danger"
                    />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

/* Components */
const StatBox = ({ label, value, icon, color, sub }) => (
    <View style={styles.statBox}>
        <View style={[styles.statHeader, { backgroundColor: color + '20' }]}>
            <Icon name={icon} size={14} color={color} />
            <Text style={[styles.statLabel, { color }]}>{label}</Text>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statSub}>{sub}</Text>
    </View>
);

const CommandButton = ({ title, icon, badge, onPress, isCritical }) => (
    <TouchableOpacity style={styles.cmdBtn} onPress={onPress}>
        <View style={styles.cmdIconBg}>
            <Icon name={icon} size={24} color={isCritical ? "#FF4444" : "#FFC700"} />
            {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
        </View>
        <Text style={styles.cmdText}>{title}</Text>
    </TouchableOpacity>
);

const AlertCard = ({ title, desc, time, type }) => (
    <View style={[styles.alertCard, { borderLeftColor: type === 'danger' ? '#FF4444' : '#FFC700' }]}>
        <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertDesc}>{desc}</Text>
        </View>
        <Text style={styles.alertTime}>{time}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    adminIdentity: { flexDirection: 'row', alignItems: 'center' },
    avatarGlow: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#FFC700', justifyContent: 'center', alignItems: 'center' },
    adminRole: { color: '#888', fontSize: 12, fontWeight: 'bold' },
    adminName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    systemStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
    statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50', marginRight: 6 },
    statusText: { color: '#4CAF50', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
    searchSection: { paddingHorizontal: 20, marginBottom: 20 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 15, height: 50, borderWidth: 1, borderColor: '#222' },
    searchInput: { flex: 1, color: '#FFF', marginLeft: 10, fontSize: 14 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 25 },
    statBox: { width: '30%', backgroundColor: '#111', borderRadius: 20, padding: 15, borderWidth: 1, borderColor: '#1A1A1A' },
    statHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 10 },
    statLabel: { fontSize: 10, fontWeight: 'bold', marginLeft: 5 },
    statValue: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
    statSub: { color: '#666', fontSize: 10, marginTop: 2 },
    sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginHorizontal: 25, marginBottom: 15, marginTop: 10 },
    seeAllText: { color: '#FFC700', fontSize: 12, marginRight: 25, fontWeight: 'bold' },
    commandRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
    cmdBtn: { width: '48%', backgroundColor: '#111', borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
    cmdIconBg: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    cmdText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
    badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF4444', borderRadius: 10, minWidth: 20, padding: 4, alignItems: 'center' },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    alertCard: { backgroundColor: '#0A0A0A', marginHorizontal: 20, marginTop: 12, padding: 15, borderRadius: 15, flexDirection: 'row', borderLeftWidth: 4 },
    alertTitle: { color: '#EEE', fontSize: 14, fontWeight: 'bold' },
    alertDesc: { color: '#777', fontSize: 12, marginTop: 3 },
    alertTime: { color: '#444', fontSize: 10 },
    moduleCard: { backgroundColor: '#111', marginHorizontal: 20, padding: 20, borderRadius: 25, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
    moduleIcon: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
    moduleTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
    moduleDesc: { color: '#666', fontSize: 12, marginTop: 2 }
});

export default AuthorityDashboard;
