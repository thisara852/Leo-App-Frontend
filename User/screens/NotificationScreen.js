import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
// Ensure you have @expo/vector-icons installed if using Expo, 
// otherwise use react-native-vector-icons
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#000000',
  surface: '#121212',
  surfaceLight: '#1E1E1E',
  primary: '#FFC107',
  textMain: '#FFFFFF',
  textDim: '#A0A0A0',
  danger: '#FF5252',
  success: '#4CAF50',
};

const FilterPill = ({ label, active, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.pill, active && styles.pillActive]}
  >
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

// Added setScreen to props
const NotificationsScreen = ({ navigation, setScreen }) => { 
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const NOTIFICATIONS_DATA = [
    {
      title: 'Recent',
      data: [
        { id: '1', type: 'security', title: 'New Login', body: 'A new device signed into your account from London.', time: '2m ago', unread: true, priority: 'high' },
        { id: '2', type: 'event', title: 'Community Meetup', body: 'Join the annual Leo District gala this Friday.', time: '1h ago', unread: true, showButton: true },
      ],
    },
    {
      title: 'Past 7 Days',
      data: [
        { id: '3', type: 'update', title: 'System Patch', body: 'v2.0.4 is now live with performance boosts.', time: '2 days ago', unread: false },
        { id: '4', type: 'security', title: 'Password Changed', body: 'Your password was successfully updated.', time: '5 days ago', unread: false },
      ],
    },
  ];

  const filteredData = useMemo(() => {
    return NOTIFICATIONS_DATA.map(section => ({
      ...section,
      data: section.data.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = activeFilter === 'All' || item.type === activeFilter.toLowerCase();
        return matchesSearch && matchesFilter;
      })
    })).filter(section => section.data.length > 0);
  }, [searchText, activeFilter]);

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.unread && styles.cardUnread]}>
      <View style={[styles.priorityBar, { backgroundColor: item.priority === 'high' ? COLORS.danger : COLORS.primary }]} />
      <View style={styles.cardInner}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Text style={{fontSize: 18}}>{item.type === 'security' ? '🛡️' : '🔔'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemTime}>{item.time}</Text>
          </View>
          {item.unread && <View style={styles.dot} />}
        </View>
        <Text style={styles.itemBody}>{item.body}</Text>
        {item.showButton && (
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Updated Header Section --- */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity 
            onPress={() => setScreen('HomeFeed')} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={26} color={COLORS.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 26 }} /> {/* Empty view to keep title centered */}
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#666"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.filterBar}>
        {['All', 'Security', 'Event', 'Update'].map((f) => (
          <FilterPill 
            key={f} 
            label={f} 
            active={activeFilter === f} 
            onPress={() => setActiveFilter(f)} 
          />
        ))}
      </View>

      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionLabel}>{title}</Text>
        )}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  
  // Header Adjustments
  header: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10 },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: { 
    color: COLORS.textMain, 
    fontSize: 22, 
    fontWeight: 'bold' 
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#222',
  },
  input: { flex: 1, color: '#fff', fontSize: 16 },

  filterBar: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    marginVertical: 10,
    flexWrap: 'wrap',
    gap: 8 
  },
  pill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#333'
  },
  pillActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  pillText: { color: COLORS.textDim, fontWeight: '600', fontSize: 13 },
  pillTextActive: { color: '#000' },

  sectionLabel: { 
    color: COLORS.primary, 
    fontSize: 12, 
    fontWeight: '800', 
    letterSpacing: 1.2, 
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase'
  },

  listPadding: { paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardUnread: { backgroundColor: '#1A1A1A', borderColor: '#333', borderWidth: 1 },
  priorityBar: { width: 4, height: '100%' },
  cardInner: { flex: 1, padding: 16 },
  
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  iconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  itemTime: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 5 },
  
  itemBody: { color: '#CCC', fontSize: 14, lineHeight: 20, marginBottom: 10 },
  
  actionBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5
  },
  actionBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
});

export default NotificationsScreen;
