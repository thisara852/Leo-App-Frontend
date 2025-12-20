import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AlertsPage = ({ navigation }) => {
    const [alerts, setAlerts] = useState([
        {
            id: '1',
            title: 'Security: Unusual Login',
            desc: 'Admin login detected from unrecognized IP: 192.168.1.45',
            time: 'Just now',
            type: 'critical',
            icon: 'shield-alert'
        },
        {
            id: '2',
            title: 'System: Database Backup',
            desc: 'Weekly automated cloud backup completed successfully.',
            time: '2 hours ago',
            type: 'info',
            icon: 'cloud-done'
        },
        {
            id: '3',
            title: 'Authority: Account Lockout',
            desc: 'User "Leo_99" locked after 5 failed password attempts.',
            time: '5 hours ago',
            type: 'warning',
            icon: 'lock-closed'
        },
        {
            id: '4',
            title: 'Policy: Post Flagged',
            desc: 'AI Moderator flagged a post in District 306-B1 for review.',
            time: 'Yesterday',
            type: 'warning',
            icon: 'flag'
        }
    ]);

    const handleClearAll = () => {
        Alert.alert("Clear Logs", "Are you sure you want to wipe all system alerts?", [
            { text: "Cancel", style: "cancel" },
            { text: "Clear All", onPress: () => setAlerts([]), style: "destructive" }
        ]);
    };

    const renderAlert = ({ item }) => (
        <View style={[styles.alertCard, { borderLeftColor: item.type === 'critical' ? '#FF4444' : item.type === 'warning' ? '#FFC700' : '#4CAF50' }]}>
            <View style={styles.alertHeader}>
                <View style={styles.iconTitleRow}>
                    <Icon name={item.icon} size={18} color={item.type === 'critical' ? '#FF4444' : '#FFC700'} />
                    <Text style={styles.alertTitle}>{item.title}</Text>
                </View>
                <Text style={styles.alertTime}>{item.time}</Text>
            </View>
            <Text style={styles.alertDesc}>{item.desc}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* TOP HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Security Logs</Text>
                <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
                    <Icon name="trash-outline" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={alerts}
                keyExtractor={item => item.id}
                renderItem={renderAlert}
                contentContainerStyle={{ padding: 20 }}
                ListHeaderComponent={<Text style={styles.sectionLabel}>System Event History</Text>}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="checkmark-circle-outline" size={60} color="#222" />
                        <Text style={styles.emptyText}>System is secure. No alerts.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
    backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    clearBtn: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
    
    sectionLabel: { color: '#444', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 20, letterSpacing: 1 },
    
    alertCard: { backgroundColor: '#0A0A0A', padding: 18, borderRadius: 20, marginBottom: 15, borderLeftWidth: 4, borderWidth: 1, borderColor: '#1A1A1A' },
    alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    iconTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    alertTitle: { color: '#EEE', fontSize: 14, fontWeight: 'bold' },
    alertTime: { color: '#444', fontSize: 10 },
    alertDesc: { color: '#888', fontSize: 13, lineHeight: 18 },

    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyText: { color: '#333', marginTop: 15, fontSize: 14 }
});

export default AlertsPage;
