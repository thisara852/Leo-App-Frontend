import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    Alert,
    StatusBar,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ManagePosts = ({ navigation }) => {
    const [activeDistrict, setActiveDistrict] = useState('All');
    const [activeClub, setActiveClub] = useState('All');

    // Mock Data - This mimics a database of pending posts
    const [posts, setPosts] = useState([
        {
            id: '1',
            userName: 'Kamal Silva',
            district: '306-B1',
            club: 'Moratuwa',
            time: '2h ago',
            content: 'Successful Beach Cleanup project completed today with 50+ volunteers! Our district is making a change. 🌊',
            image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbe5e?w=800',
            status: 'Pending'
        },
        {
            id: '2',
            userName: 'Nuwan Perera',
            district: '306-C2',
            club: 'Colombo Fort',
            time: '5h ago',
            content: 'Join us for the upcoming Youth Leadership Summit next Saturday at BMICH. Register now!',
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800',
            status: 'Pending'
        },
        {
            id: '3',
            userName: 'Aruni Jay',
            district: '306-A1',
            club: 'Kandy',
            time: '12h ago',
            content: 'New community kitchen initiative starting this Monday. Need volunteers for food prep.',
            image: null,
            status: 'Pending'
        }
    ]);

    const handleAction = (id, action) => {
        Alert.alert(
            `${action} Post?`,
            `Do you want to ${action.toLowerCase()} this post for the community?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: action, 
                    style: action === 'Reject' ? 'destructive' : 'default',
                    onPress: () => {
                        // Remove post from list after action
                        setPosts(posts.filter(p => p.id !== id));
                    } 
                }
            ]
        );
    };

    const renderPost = ({ item }) => (
        <View style={styles.postCard}>
            {/* Header: User Info */}
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                        <Text style={styles.avatarText}>{item.userName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.metaText}>{item.district} • {item.club} • {item.time}</Text>
                    </View>
                </View>
                <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>PENDING</Text>
                </View>
            </View>

            {/* Content: Text & Image */}
            <Text style={styles.postContent}>{item.content}</Text>
            {item.image && (
                <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
            )}

            {/* Action Bar */}
            <View style={styles.actionRow}>
                <TouchableOpacity 
                    style={[styles.btn, styles.rejectBtn]} 
                    onPress={() => handleAction(item.id, 'Reject')}
                >
                    <Icon name="close-circle" size={18} color="#FF4444" />
                    <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.btn, styles.approveBtn]} 
                    onPress={() => handleAction(item.id, 'Approve')}
                >
                    <Icon name="checkmark-circle" size={18} color="#000" />
                    <Text style={styles.approveText}>Approve Post</Text>
                </TouchableOpacity>
            </View>
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
                <Text style={styles.headerTitle}>Post Moderation</Text>
                <View style={styles.badgeCount}>
                    <Text style={styles.badgeText}>{posts.length}</Text>
                </View>
            </View>

            {/* NESTED FILTER SYSTEM */}
            <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Filter by District</Text>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['All', '306-A1', '306-B1', '306-C2']}
                    keyExtractor={(item) => `district-${item}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => setActiveDistrict(item)}
                            style={[styles.tab, activeDistrict === item && styles.activeTab]}
                        >
                            <Text style={[styles.tabLabel, activeDistrict === item && styles.activeTabLabel]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                
                <Text style={[styles.filterLabel, { marginTop: 15 }]}>Filter by Club</Text>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['All', 'Moratuwa', 'Colombo Fort', 'Kandy']}
                    keyExtractor={(item) => `club-${item}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => setActiveClub(item)}
                            style={[styles.tab, activeClub === item && styles.activeTab]}
                        >
                            <Text style={[styles.tabLabel, activeClub === item && styles.activeTabLabel]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* POST LIST */}
            <FlatList
                data={posts.filter(p => 
                    (activeDistrict === 'All' || p.district === activeDistrict) &&
                    (activeClub === 'All' || p.club === activeClub)
                )}
                keyExtractor={item => item.id}
                renderItem={renderPost}
                contentContainerStyle={{ padding: 15, paddingBottom: 50 }}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Icon name="checkmark-done-circle" size={80} color="#1A1A1A" />
                        <Text style={styles.emptyText}>No pending posts to review.</Text>
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
    badgeCount: { backgroundColor: '#FFC700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    badgeText: { color: '#000', fontWeight: 'bold', fontSize: 12 },

    filterSection: { paddingHorizontal: 20, marginBottom: 15 },
    filterLabel: { color: '#444', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
    tab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, marginRight: 10, backgroundColor: '#111', borderWidth: 1, borderColor: '#222' },
    activeTab: { backgroundColor: '#FFC700', borderColor: '#FFC700' },
    tabLabel: { color: '#888', fontSize: 12, fontWeight: 'bold' },
    activeTabLabel: { color: '#000' },

    postCard: { backgroundColor: '#111', borderRadius: 28, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: '#1A1A1A' },
    postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    userAvatar: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#333' },
    avatarText: { color: '#FFC700', fontWeight: 'bold', fontSize: 16 },
    userName: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
    metaText: { color: '#666', fontSize: 11, marginTop: 2 },
    pendingBadge: { backgroundColor: '#FFC70015', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    pendingText: { color: '#FFC700', fontSize: 9, fontWeight: 'bold', letterSpacing: 0.5 },

    postContent: { color: '#EEE', fontSize: 14, lineHeight: 22, marginBottom: 15 },
    postImage: { width: '100%', height: 220, borderRadius: 20, marginBottom: 18 },

    actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    btn: { flex: 1, flexDirection: 'row', height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 8 },
    rejectBtn: { backgroundColor: '#FF444410', borderWidth: 1, borderColor: '#FF444430' },
    approveBtn: { backgroundColor: '#FFC700' },
    rejectText: { color: '#FF4444', fontWeight: 'bold', fontSize: 14 },
    approveText: { color: '#000', fontWeight: 'bold', fontSize: 14 },

    emptyState: { alignItems: 'center', marginTop: 120 },
    emptyText: { color: '#333', marginTop: 15, fontSize: 16, fontWeight: '500' }
});

export default ManagePosts;
