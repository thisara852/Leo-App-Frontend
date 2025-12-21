import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar as RNStatusBar,
  StyleSheet
} from 'react-native';
// Use Expo's vector icons
import { Ionicons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Colors
const PRIMARY_GOLD = '#FFC107'; // Yellow
const BG_DARK = '#000000';
const TEXT_LIGHT = '#FFFFFF'; // Pure White
const INACTIVE_GRAY = '#8E8E93';
const SECONDARY_DARK = '#121212';

// Custom App Icon
const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT, style }) => (
  <Icon name={name} size={size} color={color} style={style} />
);

// Story Components
const StoryCircle = ({ label, uri, isNew = false, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.storyCircleContainer}>
    <View
      style={[
        styles.storyCircleFrame,
        {
          borderWidth: isNew ? 2 : 0,
          borderColor: PRIMARY_GOLD
        }
      ]}
    >
      <Image source={uri} style={styles.storyImage} />
    </View>
    <Text style={styles.storyLabel}>{label}</Text>
  </TouchableOpacity>
);

// Stories Bar
const StoriesBar = ({ openStory }) => {
  const stories = [
    { label: 'Leo D2', uri: require('../assets/Leo-District-Logo-306-D11.png'), isNew: true },
    { label: 'Leo D3', uri: require('../assets/Leo-District-Logo-306-D2.png'), isNew: true },
    { label: 'Leo D7', uri: require('../assets/Leo-District-Logo-306-D3.png'), isNew: true },
    { label: 'Leo D11', uri: require('../assets/Leo-District-Logo-306-D5.png'), isNew: true },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScrollView}>
      {stories.map((story, index) => (
        <StoryCircle key={index} {...story} onPress={() => openStory('https://picsum.photos/800/1400')} />
      ))}
    </ScrollView>
  );
};

// Tab Segment Component
const TabSegment = ({ activeTab, setActiveTab }) => {
  const tabs = ['All Post', 'Following', 'Event'];
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
            <Text style={[styles.tabText, { color: isActive ? TEXT_LIGHT : PRIMARY_GOLD }]}>
              {tab}
            </Text>
            {isActive && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Feed Post Component
const LeoFeedPost = ({ name, time, views, likes, image, onPress }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.feedPost}>
      <View style={styles.postHeader}>
        <Image source={require('../assets/Leo-District-Logo-306-D2.png')} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>{name}</Text>
          <Text style={styles.postTime}>{time}</Text>
        </View>
        <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
          <CustomAppIcon
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={bookmarked ? PRIMARY_GOLD : INACTIVE_GRAY}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.postTextGold}>
        LMP 2025 LMD 306 Rangers Is LIVE! Start Your Leadership Mentoring Journey Now.
      </Text>

      <Image source={image} style={styles.feedPostImage} />

      <View style={styles.postFooter}>
        <View style={styles.reactionIcons}>
          <CustomAppIcon name="heart-outline" size={22} style={{ marginRight: 15 }} />
          <CustomAppIcon name="chatbubble-outline" size={22} style={{ marginRight: 15 }} />
          <CustomAppIcon name="paper-plane-outline" size={22} style={{ marginRight: 15 }} />
        </View>
        <Text style={styles.likeText}>Liked by {likes} others</Text>
        <Text style={styles.viewCount}>{views}K Views</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Corrected Bottom Navigation Component ---
const BottomNav = ({ currentScreen, setScreen }) => {
  const tabs = [
    { name: "HomeFeed", icon: "home-outline" },
    { name: "Search", icon: "search-outline" },
    { name: "Notification", icon: "notifications-outline" },
    { name: "Setting", icon: "settings-outline" },
    { name: "Profile", icon: "person-outline" },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.name;
        return (
          <TouchableOpacity 
            key={tab.name} 
            onPress={() => setScreen(tab.name)} 
            style={styles.navItem}
          >
            <Icon 
              name={tab.icon} 
              size={26} 
              color={isActive ? PRIMARY_GOLD : INACTIVE_GRAY} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main Screen
const HomeFeedScreen = ({ setScreen, openStory }) => {
  const [activeTab, setActiveTab] = useState('All Post');
  const [currentBottomScreen, setCurrentBottomScreen] = useState('HomeFeed');

  const posts = [
    { name: "Leo District 306 D1", time: "08:39 am", views: "56", likes: "34", image: require('../assets/post1.jpg') },
    { name: "Leo District 306 D2", time: "09:00 am", views: "10", likes: "5", image: require('../assets/post2.jpg') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar barStyle="light-content" backgroundColor={BG_DARK} />

      {/* Header matching your screenshot */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerWelcome}>Welcome Back!</Text>
          <Text style={styles.headerName}>David Emulo</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Icon name="search-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle} onPress={() => setScreen('Notification')}>
            <Icon name="notifications-outline" size={20} color="white" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <StoriesBar openStory={openStory} />
        <TabSegment activeTab={activeTab} setActiveTab={setActiveTab} />

        {posts.map((post, index) => (
          <LeoFeedPost
            key={index}
            {...post}
            onPress={() => setScreen('PostDetail')}
          />
        ))}
      </ScrollView>

      <BottomNav
        currentScreen={currentBottomScreen}
        setScreen={(name) => {
          setCurrentBottomScreen(name);
          setScreen(name);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_DARK },
  // Header Styles
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerWelcome: { color: '#888', fontSize: 12 },
  headerName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  iconCircle: { backgroundColor: '#1C1C1E', padding: 8, borderRadius: 10, marginLeft: 10 },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: 3, backgroundColor: 'red' },
  
  // Stories Styles
  storiesScrollView: { marginVertical: 10, paddingHorizontal: 15 },
  storyCircleContainer: { alignItems: 'center', marginRight: 15 },
  storyCircleFrame: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  storyImage: { width: 58, height: 58, borderRadius: 29 },
  storyLabel: { color: '#888', marginTop: 5, fontSize: 11 },
  
  // Tabs Styles
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 15 },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 16, fontWeight: 'bold' },
  activeTabUnderline: { height: 2, backgroundColor: 'white', width: 40, marginTop: 4 },
  
  // Feed Post Styles
  feedPost: { marginBottom: 20, backgroundColor: SECONDARY_DARK, borderRadius: 20, overflow: 'hidden', paddingBottom: 15, marginHorizontal: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUserInfo: { flex: 1 },
  postUsername: { fontSize: 15, fontWeight: 'bold', color: 'white' },
  postTime: { fontSize: 12, color: INACTIVE_GRAY },
  postTextGold: { fontSize: 14, color: PRIMARY_GOLD, paddingHorizontal: 15, marginBottom: 12, fontWeight: '600' },
  feedPostImage: { width: '100%', height: 320, backgroundColor: '#333' },
  postFooter: { paddingHorizontal: 15, marginTop: 15 },
  reactionIcons: { flexDirection: 'row', marginBottom: 10 },
  likeText: { fontSize: 13, color: 'white', fontWeight: '500' },
  viewCount: { fontSize: 12, color: INACTIVE_GRAY },
  
  // Corrected Navigation Styles matching your screenshot
  bottomNavContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingVertical: 15, 
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A'
  },
  navItem: { flex: 1, alignItems: 'center' }
});

export default HomeFeedScreen;
