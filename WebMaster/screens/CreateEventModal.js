import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateEventModal = ({ visible, onClose, onSave, newEvent, setNewEvent, openImageModal }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.eventModalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>New Event Details</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={26} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                        <Text style={styles.inputLabel}>Cover Photo</Text>
                        <TouchableOpacity style={styles.eventImageUpload} onPress={() => openImageModal('event')}>
                            <Image source={{ uri: newEvent.image }} style={styles.eventImagePreview} />
                            <View style={styles.cameraIconOverlay}>
                                <Icon name="camera" size={24} color="#000" />
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 12 }}>Change Image</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.inputLabel}>Event Title</Text>
                        <TextInput 
                            style={styles.modernInput} 
                            placeholder="Event Name" 
                            placeholderTextColor="#555" 
                            onChangeText={(v) => setNewEvent({ ...newEvent, title: v })} 
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.inputLabel}>Date</Text>
                                <TextInput style={styles.modernInput} placeholder="Oct 20" placeholderTextColor="#555" onChangeText={(v) => setNewEvent({ ...newEvent, date: v })} />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.inputLabel}>Location</Text>
                                <TextInput style={styles.modernInput} placeholder="Venue" placeholderTextColor="#555" onChangeText={(v) => setNewEvent({ ...newEvent, location: v })} />
                            </View>
                        </View>

                        <Text style={styles.inputLabel}>Description</Text>
                        <TextInput 
                            style={[styles.modernInput, { height: 90 }]} 
                            multiline 
                            placeholder="Describe your event..." 
                            placeholderTextColor="#555" 
                            onChangeText={(v) => setNewEvent({ ...newEvent, description: v })} 
                        />

                        <View style={styles.modalFooterRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={{ color: '#FFF' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.createButton} onPress={onSave}>
                                <Text style={{ color: '#000', fontWeight: 'bold' }}>Create Event</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
    eventModalContainer: { backgroundColor: '#111', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#222' },
    modalHeaderTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    inputLabel: { color: '#FFC700', fontSize: 12, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
    eventImageUpload: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', marginBottom: 20, backgroundColor: '#222' },
    eventImagePreview: { width: '100%', height: '100%', opacity: 0.5 },
    cameraIconOverlay: { position: 'absolute', alignSelf: 'center', top: '35%', alignItems: 'center', backgroundColor: '#FFC700', padding: 10, borderRadius: 12 },
    modernInput: { backgroundColor: '#1A1A1A', color: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    modalFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 },
    cancelButton: { flex: 1, padding: 15, alignItems: 'center' },
    createButton: { flex: 2, backgroundColor: '#FFC700', padding: 15, borderRadius: 12, alignItems: 'center' },
});

export default CreateEventModal;
