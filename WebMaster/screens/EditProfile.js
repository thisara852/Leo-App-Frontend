import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

// --- MOCK DATA ---
const CLUB_DATA = [
    { id: 'c1', name: 'Leo Club of Moratuwa', imageUri: 'https://pbs.twimg.com/profile_images/1258312808309108736/Hk5-LvJ-_400x400.jpg', rating: '★★★★☆ (213)', description: 'Funds raised for the community service goal.' },
    { id: 'c2', name: 'Leo Club of UOC Alumni', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIST9wcqaiYNmtGqlDefMDWcF8w-Xk-sBGrg&s', rating: '★★★☆☆ (98)', description: 'University of Colombo Alumni club.' },
];

const LEADERSHIP_PAST_DATA = [
    { id: 'l1', title: 'District President', year: 'Year' },
    { id: 'l2', title: '10. Leo Lion S. Silva', year: '2023-2024' },
];

const LEADERSHIP_PRESENT_DATA = [
    { id: 'p1', name: 'Robert De Silva', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VqhQqwk5caKp43iHsFEWBMZLV-fL-OxjvPalWIZKu8p2E_iCDeCuYwzSUGqRTG5C7cc&usqp=CAU' },
];

const EVENT_DATA = [
    { id: 'e1', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOfPa-6JnGgQLSKe1mA3xfRt21S81prhqpg&s' },
];

// --- COMPONENTS ---
const LeadershipRow = ({ item, isHeader }) => (
    <View style={[styles.leadershipRow, isHeader && styles.leadershipHeader]}>
        <Text style={[styles.leadershipText, isHeader && styles.leadershipHeaderText, { flex: 2 }]}>{item.title}</Text>
        <Text style={[styles.leadershipText, isHeader && styles.leadershipHeaderText, { flex: 1, textAlign: 'right' }]}>{item.year}</Text>
    </View>
);

const InformationTab = () => {
    const [leadershipTab, setLeadershipTab] = useState('Past');
    return (
        <View style={styles.contentContainer}>
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    We empower young leaders, drive high-impact service projects, and champion initiatives like the LMD 306 Rangers Leo Mentoring Program 2025.
                </Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>District Leadership</Text>
                {/* FIXED: Replaced <div> with <View> */}
                <View style={styles.leadershipToggle}>
                    <TouchableOpacity onPress={() => setLeadershipTab('Past')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Past' && styles.activeLeadershipTab]}>Past</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLeadershipTab('Present')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Present' && styles.activeLeadershipTab]}>Present</Text>
                    </TouchableOpacity>
                </View>
                {leadershipTab === 'Past' ? (
                    <View>
                        <LeadershipRow item={LEADERSHIP_PAST_DATA[0]} isHeader />
                        {LEADERSHIP_PAST_DATA.slice(1).map(item => <LeadershipRow key={item.id} item={item} />)}
                    </View>
                ) : (
                    <View style={styles.presentLeadershipContainer}>
                        {LEADERSHIP_PRESENT_DATA.map(member => (
                            <View key={member.id} style={styles.presentLeaderCard}>
                                <Image source={{ uri: member.imageUri }} style={styles.presentLeaderImage} />
                                <Text style={styles.presentLeaderName}>{member.name}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const ClubsTab = () => (
    <View style={styles.contentContainer}>
        <FlatList
            data={CLUB_DATA}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.clubCard}>
                    <Image source={{ uri: item.imageUri }} style={styles.clubImage} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.clubName}>{item.name}</Text>
                        {item.rating && <Text style={styles.clubRating}>{item.rating}</Text>}
                        {item.description && <Text style={styles.clubDesc}>{item.description}</Text>}
                    </View>
                </View>
            )}
        />
    </View>
);

const EventTab = () => (
    <View style={styles.contentContainer}>
        <FlatList
            horizontal
            data={EVENT_DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Image source={{ uri: item.imageUri }} style={styles.eventImage} />}
            showsHorizontalScrollIndicator={false}
        />
    </View>
);

// ✅ RECEIVED setScreen FROM App.js
const EditProfile = ({ setScreen }) => {
    const [activeTab, setActiveTab] = useState('Information');
    const [isEditMode, setIsEditMode] = useState(false);

    const [name, setName] = useState('Leo District D6');
    const [location, setLocation] = useState('Kegalle');

    const renderContent = () => {
        if (isEditMode) {
            return (
                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Edit Profile</Text>
                    <TextInput
                        style={styles.inputField}
                        value={name}
                        onChangeText={setName}
                        placeholder="District Name"
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.inputField}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Location"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => setIsEditMode(false)}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        switch (activeTab) {
            case 'Information': return <InformationTab />;
            case 'List Of Clubs': return <ClubsTab />;
            case 'Event': return <EventTab />;
            default: return <InformationTab />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScrollView>
                {/* ✅ FIXED NAVIGATION LOGIC */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setScreen('HomeFeed')}>
                        <Icon name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.topBarTitle}>Profile</Text>
                    <View style={{ width: 25 }} />
                </View>

                <Image style={styles.bannerImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLpwp744hLn7_102-K3Njo9c5g4jOPFA9jQ&s' }} />

                <View style={styles.profileSection}>
                    <Image style={styles.profileImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIST9wcqaiYNmtGqlDefMDWcF8w-Xk-sBGrg&s' }} />
                    {!isEditMode && (
                        <>
                            <Text style={styles.districtName}>{name}</Text>
                            <Text style={styles.districtLocation}>{location}</Text>
                            <TouchableOpacity style={styles.editProfileButton} onPress={() => setIsEditMode(true)}>
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {!isEditMode && (
                    <View style={styles.tabContainer}>
                        {['Information', 'List Of Clubs', 'Event'].map(tab => (
                            <TouchableOpacity key={tab} style={styles.tabButton} onPress={() => setActiveTab(tab)}>
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                                {activeTab === tab && <View style={styles.tabUnderline} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {renderContent()}
                <View style={{ height: 50 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#000' },
    topBar: { flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between' },
    topBarTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    bannerImage: { width: '100%', height: 150, resizeMode: 'cover' },
    profileSection: { alignItems: 'center', marginTop: -50, paddingHorizontal: 20 },
    profileImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 5, borderColor: '#000', backgroundColor: '#333' },
    districtName: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 12 },
    districtLocation: { color: '#AAA', fontSize: 16, marginBottom: 10 },
    editProfileButton: { backgroundColor: '#FFC700', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, marginTop: 10 },
    editProfileText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    tabContainer: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#1A1A1A', marginVertical: 15, paddingHorizontal: 15 },
    tabButton: { flex: 1, alignItems: 'center', paddingBottom: 10, marginHorizontal: 5 },
    tabText: { color: '#AAA', fontSize: 14, fontWeight: '600' },
    activeTabText: { color: '#FFF' },
    tabUnderline: { height: 3, backgroundColor: '#FFC700', width: '100%', position: 'absolute', bottom: -1 },
    contentContainer: { paddingHorizontal: 20, marginBottom: 20 },
    infoSection: { marginBottom: 25 },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    descriptionText: { color: '#FFF', fontSize: 15, lineHeight: 22 },
    leadershipToggle: { flexDirection: 'row', marginBottom: 15 },
    leadershipTab: { color: '#AAA', marginRight: 20, fontSize: 16 },
    activeLeadershipTab: { color: '#FFC700', fontWeight: 'bold' },
    leadershipRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 10, backgroundColor: '#1C1C1C', borderRadius: 5, marginBottom: 5 },
    leadershipHeader: { backgroundColor: '#000', borderBottomWidth: 1, borderColor: '#333', borderRadius: 0, marginBottom: 5 },
    leadershipText: { color: '#FFF', fontSize: 14 },
    leadershipHeaderText: { fontWeight: 'bold' },
    presentLeadershipContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    presentLeaderCard: { alignItems: 'center', width: '48%' },
    presentLeaderImage: { width: '100%', height: 150, borderRadius: 10, marginBottom: 5 },
    presentLeaderName: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
    clubCard: { flexDirection: 'row', backgroundColor: '#1C1C1C', borderRadius: 10, padding: 12, marginBottom: 12 },
    clubImage: { width: 60, height: 60, borderRadius: 10 },
    clubName: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    clubRating: { color: '#FFC700', fontSize: 14 },
    clubDesc: { color: '#AAA', fontSize: 13 },
    eventImage: { width: screenWidth * 0.7, height: 150, borderRadius: 10, marginRight: 15 },
    inputField: { backgroundColor: '#1C1C1C', color: '#FFF', fontSize: 16, borderRadius: 10, padding: 12, marginVertical: 10 },
    saveButton: { backgroundColor: '#FFC700', padding: 12, borderRadius: 25, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});

export default EditProfile;
