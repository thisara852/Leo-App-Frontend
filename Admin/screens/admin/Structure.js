import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
    LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Structure = ({ navigation }) => {
    const [expandedId, setExpandedId] = useState(null);

    const organizationData = [
        {
            id: '306A1',
            name: 'District 306-A1',
            webmaster: 'it.admin.a1@leo.org',
            clubs: ['Colombo Central', 'Moratuwa Rats', 'Dehiwala']
        },
        {
            id: '306B1',
            name: 'District 306-B1',
            webmaster: 'it.admin.b1@leo.org',
            clubs: ['Negombo', 'Wattala', 'Ja-Ela']
        }
    ];

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const renderDistrict = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity 
                onPress={() => toggleExpand(item.id)} 
                style={styles.cardHeader}
            >
                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Icon name="business" size={20} color="#FFC700" />
                    </View>
                    <View>
                        <Text style={styles.districtTitle}>{item.name}</Text>
                        <Text style={styles.subText}>{item.clubs.length} Clubs Registered</Text>
                    </View>
                </View>
                <Icon name={expandedId === item.id ? "chevron-up" : "chevron-down"} size={20} color="#444" />
            </TouchableOpacity>

            {expandedId === item.id && (
                <View style={styles.expandedContent}>
                    <Text style={styles.webmasterTitle}>District Webmaster Email:</Text>
                    <Text style={styles.emailText}>{item.webmaster}</Text>
                    
                    <View style={styles.divider} />
                    
                    <Text style={styles.webmasterTitle}>Managed Clubs:</Text>
                    {item.clubs.map((club, index) => (
                        <View key={index} style={styles.clubItem}>
                            <Icon name="link-outline" size={14} color="#FFC700" />
                            <Text style={styles.clubText}>{club}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* MATCHING HEADER STYLE */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Org Structure</Text>
                <View style={styles.badgeCount}>
                    <Text style={styles.badgeText}>{organizationData.length}</Text>
                </View>
            </View>

            <FlatList
                data={organizationData}
                keyExtractor={item => item.id}
                renderItem={renderDistrict}
                contentContainerStyle={{ padding: 20 }}
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

    card: { backgroundColor: '#0A0A0A', borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1A1A1A', overflow: 'hidden' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18 },
    row: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    districtTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    subText: { color: '#444', fontSize: 12, marginTop: 2 },

    expandedContent: { padding: 18, backgroundColor: '#0D0D0D', borderTopWidth: 1, borderTopColor: '#1A1A1A' },
    webmasterTitle: { color: '#666', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
    emailText: { color: '#FFC700', fontSize: 13, marginBottom: 15 },
    divider: { height: 1, backgroundColor: '#1A1A1A', marginBottom: 15 },
    clubItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
    clubText: { color: '#CCC', fontSize: 14 }
});

export default Structure;
