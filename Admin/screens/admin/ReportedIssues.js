import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReportedIssues = ({ navigation }) => { // Changed prop to navigation
    const [activeFilter, setActiveFilter] = useState('All');

    const reports = [
        {
            id: '1',
            type: 'Content',
            subject: 'Spam Post: "Win a Prize"',
            reporter: 'Leo Perera',
            target: 'District 306-B Post #992',
            priority: 'Urgent',
            status: 'Pending',
            desc: 'This post is a phishing link and violates service standards.'
        },
        {
            id: '2',
            type: 'Technical',
            subject: 'Profile Image Not Saving',
            reporter: 'Webmaster - Moratuwa',
            target: 'App Feature: Profile Edit',
            priority: 'Medium',
            status: 'Investigating',
            desc: 'Users report that their DP reverts to default after 2 minutes.'
        },
        {
            id: '3',
            type: 'Abuse',
            subject: 'Harassment in Comments',
            reporter: 'Leo Silva',
            target: 'User: @Leo_Hacker',
            priority: 'High',
            status: 'Pending',
            desc: 'Repeated toxic comments on the Youth Leadership post.'
        }
    ];

    const renderReportItem = ({ item }) => (
        <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.typeBadge, { backgroundColor: item.type === 'Technical' ? '#2196F3' : '#FF4444' }]}>
                    <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <View style={[styles.priorityTag, { borderColor: getPriorityColor(item.priority) }]}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                        {item.priority}
                    </Text>
                </View>
            </View>

            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.targetText}>Target: <Text style={{ color: '#FFC700' }}>{item.target}</Text></Text>
            <Text style={styles.description}>{item.desc}</Text>

            <View style={styles.footer}>
                <Text style={styles.reporterInfo}>By {item.reporter}</Text>
                <View style={styles.actionRow}>
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.dismissBtn]}
                        onPress={() => Alert.alert("Dismissed", "Issue marked as resolved.")}
                    >
                        <Icon name="checkmark" size={16} color="#AAA" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.takeActionBtn]}
                        onPress={() => Alert.alert("Investigating", "Opening management tools...")}
                    >
                        <Text style={styles.takeActionText}>Take Action</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Issue Oversight</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="filter" size={20} color="#FFC700" />
                </TouchableOpacity>
            </View>

            {/* SYSTEM HEALTH MONITOR */}
            <View style={styles.healthContainer}>
                <Text style={styles.healthTitle}>Real-time System Health</Text>
                <View style={styles.healthRow}>
                    <HealthStatus label="Database" status="Online" />
                    <HealthStatus label="API Server" status="Online" />
                    <HealthStatus label="Media CDN" status="Slow" />
                </View>
            </View>

            {/* FILTER TABS */}
            <View style={styles.tabContainer}>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['All', 'Content', 'Technical', 'Abuse']}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => setActiveFilter(item)}
                            style={[styles.tab, activeFilter === item && styles.activeTab]}
                        >
                            <Text style={[styles.tabLabel, activeFilter === item && styles.activeTabLabel]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList
                data={reports.filter(r => activeFilter === 'All' || r.type === activeFilter)}
                keyExtractor={item => item.id}
                renderItem={renderReportItem}
                contentContainerStyle={{ padding: 20 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No pending issues in this category.</Text>}
            />
        </SafeAreaView>
    );
};

// Helper Components
const HealthStatus = ({ label, status }) => (
    <View style={styles.healthItem}>
        <View style={[styles.dot, { backgroundColor: status === 'Online' ? '#4CAF50' : status === 'Slow' ? '#FFC700' : '#FF4444' }]} />
        <Text style={styles.healthLabel}>{label}: {status}</Text>
    </View>
);

const getPriorityColor = (p) => {
    if (p === 'Urgent') return '#FF4444';
    if (p === 'High') return '#FF8C00';
    return '#FFC700';
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    filterButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
    
    healthContainer: { backgroundColor: '#111', marginHorizontal: 20, marginVertical: 10, padding: 15, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
    healthTitle: { color: '#666', fontSize: 10, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
    healthRow: { flexDirection: 'row', justifyContent: 'space-between' },
    healthItem: { flexDirection: 'row', alignItems: 'center' },
    dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
    healthLabel: { color: '#EEE', fontSize: 10 },

    tabContainer: { paddingLeft: 20, marginVertical: 10 },
    tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, marginRight: 10, backgroundColor: '#111', borderWidth: 1, borderColor: '#222' },
    activeTab: { backgroundColor: '#FFC700', borderColor: '#FFC700' },
    tabLabel: { color: '#888', fontSize: 12, fontWeight: 'bold' },
    activeTabLabel: { color: '#000' },

    reportCard: { backgroundColor: '#111', borderRadius: 25, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1A1A1A' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    typeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    priorityTag: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    priorityText: { fontSize: 10, fontWeight: 'bold' },
    subject: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    targetText: { color: '#666', fontSize: 12, marginBottom: 10 },
    description: { color: '#AAA', fontSize: 13, lineHeight: 18, marginBottom: 15 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#222', paddingTop: 15 },
    reporterInfo: { color: '#555', fontSize: 11 },
    actionRow: { flexDirection: 'row', alignItems: 'center' },
    actionBtn: { borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    dismissBtn: { width: 38, height: 38, backgroundColor: '#1A1A1A', marginRight: 10 },
    takeActionBtn: { backgroundColor: '#FFC700', paddingHorizontal: 15, paddingVertical: 10 },
    takeActionText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
    emptyText: { color: '#444', textAlign: 'center', marginTop: 50 }
});

export default ReportedIssues;
