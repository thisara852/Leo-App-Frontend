import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal, Alert, Linking, Platform 
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

// Conditional import to prevent web crashes
let RNCalendarEvents;
if (Platform.OS !== 'web') {
  try {
    RNCalendarEvents = require('react-native-calendar-events').default;
  } catch (e) {
    console.log("Calendar events library not found");
  }
}

const Colors = {
  background: '#0D0D0D', 
  accentGold: '#FFC800', 
  textWhite: '#FFFFFF',
  textGray: '#CCCCCC',
  cardBackground: '#1C1C1C',
  mapPlaceholder: '#222222', 
  navigationBackground: '#000000',
};

// --- Reusable Components ---
const CustomHeader = ({ onBack, saved, onToggleSave, onMenu }) => (
  <View style={sharedStyles.header}>
    <TouchableOpacity onPress={onBack}>
      <Icon name="arrow-back" size={24} color={Colors.textWhite} />
    </TouchableOpacity>
    <View style={sharedStyles.headerIcons}>
        <TouchableOpacity onPress={onToggleSave}>
          <Icon 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={saved ? Colors.accentGold : Colors.textWhite} 
            style={{ marginRight: 15 }} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenu}>
            <Icon name="ellipsis-vertical" size={24} color={Colors.textWhite} />
        </TouchableOpacity>
    </View>
  </View>
);

const TabSelector = ({ activeTab, onSelectTab }) => (
    <View style={tabStyles.tabBar}>
        {['Overview', 'Details'].map(tab => (
            <TouchableOpacity 
                key={tab}
                style={[tabStyles.tabButton, activeTab === tab && tabStyles.activeTabIndicator]}
                onPress={() => onSelectTab(tab)}
            >
                <Text style={activeTab === tab ? tabStyles.activeTabText : tabStyles.inactiveTabText}>
                    {tab}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

const DetailRow = ({ iconName, text, subText, onIconPress }) => (
    <View style={detailsStyles.row}>
        <TouchableOpacity onPress={onIconPress}>
            <Icon name={iconName} size={24} color={Colors.accentGold} style={detailsStyles.rowIcon} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
            <Text style={detailsStyles.rowText}>{text}</Text>
            <Text style={detailsStyles.rowSubText}>{subText}</Text>
        </View>
    </View>
);

// --- Calendar Modal ---
const CalendarModal = ({ visible, onClose, onAdd }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleAdd = async () => {
    // Check if we are on Web
    if (Platform.OS === 'web') {
      Alert.alert('Not Supported', 'Calendar features are only available on mobile devices.');
      onAdd();
      return;
    }

    try {
      const status = await RNCalendarEvents.requestPermissions();
      if (status === 'authorized') {
        const startDate = new Date(year, month, selectedDate.getDate(), 16, 0); 
        const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); 
        await RNCalendarEvents.saveEvent('Creative Minds Summit', {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          location: 'Gala Convention Center, Colombo',
          notes: 'Join the Creative Minds Summit to learn and network.',
        });
        Alert.alert('Success', 'Event successfully added to your calendar!');
        onAdd();
      } else {
        Alert.alert('Permission Denied', 'Cannot access calendar.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add event to calendar.');
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={calendarStyles.overlay}>
        <View style={calendarStyles.container}>
          <View style={calendarStyles.header}>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(year, month - 1, 1))}>
              <Icon name="chevron-back-outline" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
            <Text style={calendarStyles.monthText}>
              {selectedDate.toLocaleString('default', { month: 'long' })} {year}
            </Text>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(year, month + 1, 1))}>
              <Icon name="chevron-forward-outline" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>
          <View style={calendarStyles.daysGrid}>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  calendarStyles.dayButton,
                  day === selectedDate.getDate() && calendarStyles.activeDay
                ]}
                onPress={() => setSelectedDate(new Date(year, month, day))}
              >
                <Text style={[
                  calendarStyles.dayText,
                  day === selectedDate.getDate() && calendarStyles.activeDayText
                ]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={calendarStyles.actionRow}>
            <TouchableOpacity onPress={onClose} style={calendarStyles.actionButton}>
              <Text style={calendarStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={calendarStyles.addButton}>
              <Text style={calendarStyles.addText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- Main Screen ---
const PostDetailScreen = ({ setScreen }) => { 
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const openGoogleMaps = () => {
    const location = 'Gala Convention Center, 30 Duplication Road, Colombo';
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(location)}`,
      android: `geo:0,0?q=${encodeURIComponent(location)}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    });
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Failed to open map.'));
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <CustomHeader 
            onBack={() => setScreen('HomeFeed')} 
            saved={isSaved} 
            onToggleSave={() => setIsSaved(!isSaved)}
            onMenu={() => console.log('Menu Pressed')} 
        />
        
        <View style={sharedStyles.profileRow}>
          <Image 
            source={require('../assets/Leo-District-Logo-306-D2.png')}
            style={sharedStyles.profileLogo}
          />
          <View style={sharedStyles.profileTextContainer}>
            <Text style={sharedStyles.profileName}>Leo District 306 D1</Text>
            <Text style={sharedStyles.profileLocation}>Colombo</Text>
          </View>
        </View>

        <View style={sharedStyles.postCard}>
          <Image 
            source={require('../assets/post1.jpg')}
            style={detailsStyles.postImageSmall}
          />
        </View>

        <TabSelector activeTab={activeTab} onSelectTab={setActiveTab} />

        {activeTab === 'Overview' ? (
          <View style={sharedStyles.paddingHorizontal}>
            <Text style={overviewStyles.overviewText}>
              Join Leo District 306 D-1 for the official launch of the transformative Leo Mentoring Program (LMP) 2025.
            </Text>
            <View style={{ paddingLeft: 10, marginBottom: 10 }}>
              <Text style={overviewStyles.overviewText}>• Mentoring workshops</Text>
              <Text style={overviewStyles.overviewText}>• Leadership talks</Text>
              <Text style={overviewStyles.overviewText}>• Networking opportunities</Text>
            </View>
          </View>
        ) : (
          <View style={sharedStyles.paddingHorizontal}>
            <Text style={detailsStyles.eventTitle}>Creative Minds Summit</Text>
            <DetailRow 
                iconName="calendar-outline" 
                text="14 December, 2021" 
                subText="Tuesday, 4:00 PM - 8:00 PM" 
                onIconPress={() => setCalendarVisible(true)}
            />
            <DetailRow 
                iconName="location-outline" 
                text="Gala Convention Center" 
                subText="30 Duplication Road, Colombo" 
                onIconPress={openGoogleMaps}
            />
            <Text style={detailsStyles.sectionTitle}>LOCATION</Text>
            <View style={detailsStyles.mapPlaceholder}>
                <Image 
                    source={require('../assets/location.jpg')}
                    style={detailsStyles.mapImage}
                    resizeMode="cover"
                />
            </View>
          </View>
        )}
      </ScrollView>

      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setCalendarVisible(false)} 
        onAdd={() => setCalendarVisible(false)}
      />
    </SafeAreaView>
  );
};

const sharedStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  paddingHorizontal: { paddingHorizontal: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  profileRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 15 },
  profileLogo: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: Colors.accentGold, marginRight: 10 },
  profileName: { color: Colors.textWhite, fontSize: 16, fontWeight: 'bold' },
  profileLocation: { color: Colors.textGray, fontSize: 12 },
  profileTextContainer: { justifyContent: 'center' },
  postCard: { marginHorizontal: 15, borderRadius: 10, overflow: 'hidden', marginBottom: 20 },
});

const tabStyles = StyleSheet.create({
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1E1E1E', marginHorizontal: 15, marginBottom: 20 },
  tabButton: { paddingVertical: 10, marginRight: 30 },
  activeTabIndicator: { borderBottomWidth: 3, borderBottomColor: Colors.accentGold },
  activeTabText: { color: Colors.textWhite, fontSize: 16, fontWeight: 'bold' },
  inactiveTabText: { color: Colors.textGray, fontSize: 16 },
});

const overviewStyles = StyleSheet.create({
  overviewText: { color: Colors.textWhite, fontSize: 16, lineHeight: 24, marginBottom: 10 },
});

const detailsStyles = StyleSheet.create({
  eventTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textWhite, marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 20 },
  rowIcon: { marginRight: 15 },
  rowText: { fontSize: 16, color: Colors.textWhite, fontWeight: '600' },
  rowSubText: { fontSize: 14, color: Colors.textGray, marginTop: 2 },
  sectionTitle: { fontSize: 14, color: Colors.textGray, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  mapPlaceholder: { height: 200, backgroundColor: Colors.mapPlaceholder, borderRadius: 10, overflow: 'hidden' },
  mapImage: { width: '100%', height: '100%' },
  postImageSmall: { width: '100%', height: 200 }
});

const calendarStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: Colors.cardBackground, borderRadius: 15, width: '85%', padding: 20, borderWidth: 1, borderColor: Colors.accentGold },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthText: { color: Colors.textWhite, fontWeight: 'bold', fontSize: 18 },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayButton: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
  dayText: { color: Colors.textWhite, fontSize: 14 },
  activeDay: { backgroundColor: Colors.accentGold, borderRadius: 20 },
  activeDayText: { color: '#000', fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  actionButton: { paddingHorizontal: 15, paddingVertical: 8 },
  cancelText: { color: Colors.textGray, fontSize: 16 },
  addButton: { backgroundColor: Colors.accentGold, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 8 },
  addText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});

export default PostDetailScreen;
