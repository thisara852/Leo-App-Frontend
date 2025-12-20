import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    StatusBar,
    Alert,
    Modal,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfile = ({ setScreen }) => {
    const [userRole, setUserRole] = useState('District'); 

    // --- UI STATE ---
    const [isEditMode, setIsEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Information');
    const [leadershipTab, setLeadershipTab] = useState('Present');
    
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [imageTarget, setImageTarget] = useState(''); 

    // --- DATA STATE ---
    const DEFAULT_USER = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; 
    const DEFAULT_EVENT_IMG = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000';
    
    const [profileData, setProfileData] = useState({
        name: userRole === 'District' ? 'Leo District 306 D6' : 'Leo Club of Moratuwa',
        location: 'Western Province, SL',
        description: 'Empowering youth through service and leadership development.',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIST9wcqaiYNmtGqlDefMDWcF8w-Xk-sBGrg&s'
    });

    const [presentLeader, setPresentLeader] = useState({
        id: 'p1',
        name: 'Leo Robert De Silva',
        title: 'President',
        imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VqhQqwk5caKp43iHsFEWBMZLV-fL-OxjvPalWIZKu8p2E_iCDeCuYwzSUGqRTG5C7cc&usqp=CAU'
    });

    const [pastPresidents, setPastPresidents] = useState([
        { id: 'pp1', name: 'Leo Lion S. Silva', year: '2023-2024' },
    ]);

    const [events, setEvents] = useState([
        { id: '1', title: 'Youth Leadership Summit', date: 'Oct 25, 2024', location: 'Colombo', description: 'Annual gathering of Leos.', image: DEFAULT_EVENT_IMG }
    ]);

    const [newEvent, setNewEvent] = useState({
        title: '', date: '', location: '', description: '', image: DEFAULT_EVENT_IMG
    });

    // --- HANDLERS ---
    const openImageModal = (target) => {
        setImageTarget(target);
        if (target === 'profile') setTempImage(profileData.profileImage);
        else if (target === 'president') setTempImage(presentLeader.imageUri);
        else setTempImage(newEvent.image);
        setImageModalVisible(true);
    };

    const handleRemoveImage = () => {
        setTempImage(DEFAULT_USER);
    };

    const saveNewImage = () => {
        if (imageTarget === 'profile') setProfileData({ ...profileData, profileImage: tempImage });
        else if (imageTarget === 'president') setPresentLeader({ ...presentLeader, imageUri: tempImage });
        else setNewEvent({ ...newEvent, image: tempImage });
        setImageModalVisible(false);
    };

    const addPastPresident = () => {
        const newItem = { id: Date.now().toString(), name: '', year: '' };
        setPastPresidents([...pastPresidents, newItem]);
    };

    const updatePastPresident = (id, field, value) => {
        setPastPresidents(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const deletePastPresident = (id) => {
        setPastPresidents(prev => prev.filter(item => item.id !== id));
    };

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) {
            Alert.alert("Missing Info", "Please provide at least a title and date.");
            return;
        }
        setEvents([{ ...newEvent, id: Date.now().toString() }, ...events]);
        setEventModalVisible(false);
        setNewEvent({ title: '', date: '', location: '', description: '', image: DEFAULT_EVENT_IMG });
    };

    // --- RENDER SECTIONS ---

    const renderInformation = () => (
        <View style={styles.contentContainer}>
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{profileData.description}</Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>{userRole === 'District' ? 'District Leadership' : 'Leadership History'}</Text>
                <View style={styles.leadershipToggle}>
                    <TouchableOpacity onPress={() => setLeadershipTab('Present')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Present' && styles.activeLeadershipTab]}>Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLeadershipTab('Past')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Past' && styles.activeLeadershipTab]}>Past Presidents</Text>
                    </TouchableOpacity>
                </View>

                {leadershipTab === 'Present' ? (
                    <View style={styles.presentLeadershipContainer}>
                        <View style={styles.presentLeaderCard}>
                            <Image source={{ uri: presentLeader.imageUri }} style={styles.presentLeaderImage} />
                            <Text style={styles.presentLeaderName}>{presentLeader.name}</Text>
                            <Text style={{color: '#AAA', fontSize: 12}}>{presentLeader.title}</Text>
                        </View>
                    </View>
                ) : (
                    <View>
                        {pastPresidents.map(item => (
                            <View key={item.id} style={styles.leadershipRow}>
                                <Text style={[styles.leadershipText, { flex: 2 }]}>{item.name || "Unnamed"}</Text>
                                <Text style={[styles.leadershipText, { flex: 1, textAlign: 'right' }]}>{item.year || "Year"}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );

    const renderEvents = () => (
        <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.imagePickerBtn} onPress={() => setEventModalVisible(true)}>
                <Icon name="calendar-outline" size={22} color="#000" style={{marginRight: 10}} />
                <Text style={styles.imagePickerText}>Create New Event</Text>
            </TouchableOpacity>

            {events.map(event => (
                <View key={event.id} style={styles.eventCard}>
                    <Image source={{ uri: event.image }} style={styles.eventImage} />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.eventRow}><Icon name="calendar" size={12} color="#FFC700" /><Text style={styles.eventSubText}> {event.date}</Text></View>
                        <View style={styles.eventRow}><Icon name="location" size={12} color="#FFC700" /><Text style={styles.eventSubText}> {event.location}</Text></View>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderEditInterface = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.editHeader}>Admin Management</Text>
            <Text style={styles.inputLabel}>Profile Info</Text>
            <TouchableOpacity onPress={() => openImageModal('profile')} style={styles.imagePickerBtn}>
                <Icon name="camera" size={24} color="#000" style={{marginRight: 12}} />
                <Text style={styles.imagePickerText}>Change Profile Logo</Text>
            </TouchableOpacity>
            
            <TextInput style={styles.inputField} value={profileData.name} onChangeText={(v) => setProfileData({...profileData, name: v})} placeholder="Name" placeholderTextColor="#888" />
            <TextInput style={[styles.inputField, {height: 80, textAlignVertical: 'top'}]} multiline value={profileData.description} onChangeText={(v) => setProfileData({...profileData, description: v})} placeholder="Description" placeholderTextColor="#888" />

            <Text style={[styles.inputLabel, {marginTop: 20}]}>Current President</Text>
            <View style={styles.editLeaderBox}>
                <TouchableOpacity onPress={() => openImageModal('president')}>
                    <Image source={{ uri: presentLeader.imageUri }} style={styles.editLeaderSmallImg} />
                    <View style={styles.cameraIconBadge}><Icon name="camera" size={12} color="#FFF" /></View>
                </TouchableOpacity>
                <View style={{flex: 1, marginLeft: 15}}>
                    <TextInput style={styles.inputField} value={presentLeader.name} onChangeText={(v) => setPresentLeader({...presentLeader, name: v})} placeholder="Name" placeholderTextColor="#888" />
                    <TextInput style={styles.inputField} value={presentLeader.title} onChangeText={(v) => setPresentLeader({...presentLeader, title: v})} placeholder="Title" placeholderTextColor="#888" />
                </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25}}>
                <Text style={styles.inputLabel}>Edit Past Presidents</Text>
                <TouchableOpacity onPress={addPastPresident}><Icon name="add-circle" size={28} color="#FFC700" /></TouchableOpacity>
            </View>

            {pastPresidents.map((item) => (
                <View key={item.id} style={styles.pastPresEditRow}>
                    <View style={{flex: 2}}><TextInput style={styles.pastInput} value={item.name} onChangeText={(v) => updatePastPresident(item.id, 'name', v)} placeholder="President Name" placeholderTextColor="#555" /></View>
                    <View style={{flex: 1, marginLeft: 5}}><TextInput style={styles.pastInput} value={item.year} onChangeText={(v) => updatePastPresident(item.id, 'year', v)} placeholder="Year" placeholderTextColor="#555" /></View>
                    <TouchableOpacity onPress={() => deletePastPresident(item.id)} style={styles.deleteBtn}><Icon name="trash-outline" size={20} color="#FF4444" /></TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={() => setIsEditMode(false)}>
                <Text style={styles.saveButtonText}>Done Editing</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            
            {/* EVENT MODAL */}
            <Modal visible={eventModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.eventModalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderTitle}>New Event Details</Text>
                            <TouchableOpacity onPress={() => setEventModalVisible(false)}><Icon name="close" size={26} color="#FFF" /></TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20}}>
                            <Text style={styles.inputLabel}>Cover Photo</Text>
                            <TouchableOpacity style={styles.eventImageUpload} onPress={() => openImageModal('event')}>
                                <Image source={{ uri: newEvent.image }} style={styles.eventImagePreview} />
                                <View style={styles.cameraIconOverlay}><Icon name="camera" size={24} color="#000" /><Text style={{color: '#000', fontWeight: 'bold', fontSize: 12}}>Change Image</Text></View>
                            </TouchableOpacity>

                            <Text style={styles.inputLabel}>Event Title</Text>
                            <TextInput style={styles.modernInput} placeholder="Event Name" placeholderTextColor="#555" onChangeText={(v) => setNewEvent({...newEvent, title: v})} />
                            
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{width: '48%'}}><Text style={styles.inputLabel}>Date</Text><TextInput style={styles.modernInput} placeholder="Oct 20" placeholderTextColor="#555" onChangeText={(v) => setNewEvent({...newEvent, date: v})} /></View>
                                <View style={{width: '48%'}}><Text style={styles.inputLabel}>Location</Text><TextInput style={styles.modernInput} placeholder="Venue" placeholderTextColor="#555" onChangeText={(v) => setNewEvent({...newEvent, location: v})} /></View>
                            </View>

                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput style={[styles.modernInput, {height: 90}]} multiline placeholder="Describe your event..." placeholderTextColor="#555" onChangeText={(v) => setNewEvent({...newEvent, description: v})} />

                            <View style={styles.modalFooterRow}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setEventModalVisible(false)}><Text style={{color: '#FFF'}}>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.createButton} onPress={handleAddEvent}><Text style={{color: '#000', fontWeight: 'bold'}}>Create Event</Text></TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* IMAGE PICKER MODAL */}
            <Modal visible={imageModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Update Photo</Text>
                        <Image source={{ uri: tempImage }} style={styles.modalPresPreview} />
                        
                        <TouchableOpacity style={styles.modalPickBtn} onPress={() => Alert.alert("Gallery", "Opening...")}>
                            <Icon name="images-outline" size={18} color="#FFF" style={{marginRight: 8}} />
                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Choose from Gallery</Text>
                        </TouchableOpacity>

                        {imageTarget !== 'profile' && (
                            <TouchableOpacity style={styles.modalRemoveBtn} onPress={handleRemoveImage}>
                                <Icon name="trash-outline" size={18} color="#FF4444" style={{marginRight: 8}} />
                                <Text style={{color: '#FF4444', fontWeight: 'bold'}}>Remove Current Image</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.modalActionRow}>
                            <TouchableOpacity onPress={() => setImageModalVisible(false)}><Text style={{color: '#AAA'}}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalSaveBtn} onPress={saveNewImage}><Text style={{color: '#000', fontWeight: 'bold'}}>Save Changes</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setScreen('HomeFeed')}><Icon name="arrow-back" size={25} color="#FFF" /></TouchableOpacity>
                    <Text style={styles.topBarTitle}>{userRole} Webmaster</Text>
                    <View style={{width: 25}} />
                </View>

                <Image style={styles.bannerImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLpwp744hLn7_102-K3Njo9c5g4jOPFA9jQ&s' }} />

                <View style={styles.profileSection}>
                    <Image style={styles.profileImage} source={{ uri: profileData.profileImage }} />
                    <Text style={styles.districtName}>{profileData.name}</Text>
                    <TouchableOpacity style={styles.editProfileButton} onPress={() => setIsEditMode(!isEditMode)}>
                        <Text style={styles.editProfileText}>{isEditMode ? 'View Profile' : 'Edit Profile'}</Text>
                    </TouchableOpacity>
                </View>

                {!isEditMode && (
                    <View style={styles.tabContainer}>
                        {['Information', 'Clubs', 'Event'].map(tab => (
                            <TouchableOpacity key={tab} style={styles.tabButton} onPress={() => setActiveTab(tab)}>
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                                {activeTab === tab && <View style={styles.tabUnderline} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {isEditMode ? renderEditInterface() : (
                    activeTab === 'Information' ? renderInformation() : 
                    activeTab === 'Event' ? renderEvents() : 
                    <View style={{padding: 20}}><Text style={{color: '#FFF', textAlign: 'center'}}>Clubs list coming soon...</Text></View>
                )}
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
    districtName: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
    editProfileButton: { backgroundColor: '#FFC700', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 30, marginTop: 10 },
    editProfileText: { color: '#000', fontWeight: 'bold' },
    tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#1A1A1A', marginVertical: 15, paddingHorizontal: 15 },
    tabButton: { flex: 1, alignItems: 'center', paddingBottom: 10 },
    tabText: { color: '#AAA' },
    activeTabText: { color: '#FFF', fontWeight: 'bold' },
    tabUnderline: { height: 3, backgroundColor: '#FFC700', width: '80%', position: 'absolute', bottom: -1 },
    contentContainer: { paddingHorizontal: 20 },
    infoSection: { marginBottom: 20 },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    descriptionText: { color: '#EEE', fontSize: 14, lineHeight: 20 },
    leadershipToggle: { flexDirection: 'row', marginBottom: 15 },
    leadershipTab: { color: '#AAA', marginRight: 20 },
    activeLeadershipTab: { color: '#FFC700', fontWeight: 'bold' },
    leadershipRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#111', borderRadius: 8, marginBottom: 5 },
    leadershipText: { color: '#FFF' },
    presentLeadershipContainer: { alignItems: 'center' },
    presentLeaderCard: { alignItems: 'center', backgroundColor: '#111', padding: 15, borderRadius: 15, width: '75%' },
    presentLeaderImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
    presentLeaderName: { color: '#FFF', fontWeight: 'bold' },
    inputLabel: { color: '#FFC700', fontSize: 12, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
    inputField: { backgroundColor: '#111', color: '#FFF', borderRadius: 10, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
    modernInput: { backgroundColor: '#1A1A1A', color: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    editLeaderBox: { flexDirection: 'row', backgroundColor: '#111', padding: 12, borderRadius: 12, alignItems: 'center' },
    editLeaderSmallImg: { width: 70, height: 70, borderRadius: 35 },
    cameraIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFC700', borderRadius: 10, padding: 4 },
    imagePickerBtn: { backgroundColor: '#FFC700', flexDirection: 'row', paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 12 },
    imagePickerText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    pastPresEditRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    pastInput: { backgroundColor: '#1A1A1A', color: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#333', flex: 1 },
    deleteBtn: { marginLeft: 10, padding: 5 },
    saveButton: { backgroundColor: '#FFC700', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 30 },
    saveButtonText: { fontWeight: 'bold', color: '#000' },
    editHeader: { color: '#FFF', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
    eventModalContainer: { backgroundColor: '#111', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#222' },
    modalHeaderTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    eventImageUpload: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', marginBottom: 20, backgroundColor: '#222' },
    eventImagePreview: { width: '100%', height: '100%', opacity: 0.5 },
    cameraIconOverlay: { position: 'absolute', alignSelf: 'center', top: '35%', alignItems: 'center', backgroundColor: '#FFC700', padding: 10, borderRadius: 12 },
    modalFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 },
    cancelButton: { flex: 1, padding: 15, alignItems: 'center' },
    createButton: { flex: 2, backgroundColor: '#FFC700', padding: 15, borderRadius: 12, alignItems: 'center' },
    eventCard: { backgroundColor: '#111', borderRadius: 15, marginBottom: 15, flexDirection: 'row', padding: 12, borderWidth: 1, borderColor: '#222' },
    eventImage: { width: 70, height: 70, borderRadius: 10 },
    eventInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    eventTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    eventSubText: { color: '#AAA', fontSize: 12 },
    eventRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    modalContent: { backgroundColor: '#111', width: '85%', padding: 25, borderRadius: 20, alignSelf: 'center', marginBottom: '50%' },
    modalPresPreview: { width: 140, height: 140, borderRadius: 70, alignSelf: 'center', marginBottom: 20 },
    modalPickBtn: { backgroundColor: '#222', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
    modalRemoveBtn: { backgroundColor: 'transparent', flexDirection: 'row', padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#FF4444' },
    modalActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalSaveBtn: { backgroundColor: '#FFC700', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
    modalTitle: { color: '#FFF', textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 'bold' },
});

export default EditProfile;
