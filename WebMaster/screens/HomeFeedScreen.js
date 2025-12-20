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
  TextInput,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

// Colors
const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';
const SECONDARY_DARK = '#1F1F1F';

// Custom Icon
const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT, style }) => (
  <Icon name={name} size={size} color={color} style={style} />
);

// 🔹 HEADER (Linked to SearchScreen and NotificationScreen)
const HomeHeader = ({ setScreen }) => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.userName}>Akarsha</Text>
    </View>

    <View style={styles.headerIcons}>
      <TouchableOpacity
        style={{ marginRight: 18 }}
        onPress={() => setScreen('SearchScreen')}
      >
        <CustomAppIcon name="search-outline" size={22} color={PRIMARY_GOLD} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setScreen('NotificationScreen')}
      >
        <CustomAppIcon name="notifications-outline" size={22} color={PRIMARY_GOLD} />
      </TouchableOpacity>
    </View>
  </View>
);

// Story Circle
const StoryCircle = ({ label, uri, isNew = false, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', marginRight: 15 }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: isNew ? 2 : 0,
        borderColor: PRIMARY_GOLD
      }}
    >
      <Image source={uri} style={{ width: 50, height: 50, borderRadius: 25 }} />
    </View>
    <Text style={{ color: TEXT_LIGHT, marginTop: 5 }}>{label}</Text>
  </TouchableOpacity>
);

// Stories Bar
const StoriesBar = ({ openStory }) => {
  const stories = [
    { label: 'Leo D11', uri: require('../assets/Leo-District-Logo-306-D11.png'), isNew: true, image: 'https://placekitten.com/800/1400' },
    { label: 'Leo D2', uri: require('../assets/Leo-District-Logo-306-D2.png'), image: 'https://placekitten.com/801/1400' },
    { label: 'Leo Club 3', uri: require('../assets/Leo-District-Logo-306-D3.png'), image: 'https://placekitten.com/802/1400' },
    { label: 'Leo Club 5', uri: require('../assets/Leo-District-Logo-306-D5.png'), image: 'https://placekitten.com/803/1400' },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10, paddingHorizontal: 15 }}>
      {stories.map((story, index) => (
        <StoryCircle key={index} {...story} onPress={() => openStory(story.image)} />
      ))}
    </ScrollView>
  );
};

// Feed Post
const LeoFeedPost = ({ name, time, views, likes, image, text, onPress }) => {
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
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={bookmarked ? PRIMARY_GOLD : INACTIVE_TAB_COLOR}
          />
        </TouchableOpacity>
      </View>

      {text && <Text style={styles.postTextGold}>{text}</Text>}
      {image && <Image source={image} style={styles.feedPostImage} />}

      <View style={styles.postFooter}>
        <View style={styles.reactionIcons}>
          <CustomAppIcon name="heart-outline" size={20} />
          <CustomAppIcon name="chatbubble-outline" size={20} />
          <CustomAppIcon name="paper-plane-outline" size={20} />
          <CustomAppIcon name="link-outline" size={20} />
        </View>
        <Text style={styles.likeText}>Liked by mr.beast and {likes} others</Text>
        <Text style={styles.viewCount}>{views}K Views</Text>
      </View>
    </TouchableOpacity>
  );
};

// MAIN SCREEN
const HomeFeedScreen = ({ setScreen, openStory }) => {
  const [selectedTab, setSelectedTab] = useState('Following');

  const [posts, setPosts] = useState([
    {
      name: "Leo District 306 D1",
      time: "08:39 am",
      views: "56",
      likes: "34",
      image: require('../assets/post1.jpg'),
      text: "LMP 2025 LMD 306 Rangers Is LIVE!",
    },
    {
      name: "Leo Club Colombo",
      time: "09:10 am",
      views: "42",
      likes: "28",
      image: require('../assets/post2.jpg'),
      text: "Successful beach cleanup project completed 🌊♻️",
    },
    {
      name: "Leo District 306 D2",
      time: "10:05 am",
      views: "78",
      likes: "51",
      image: require('../assets/post3.jpg'),
      text: "Leadership workshop highlights 💡🔥",
    },
    {
      name: "Leo Club Kandy",
      time: "11:20 am",
      views: "33",
      likes: "19",
      image: require('../assets/post4.jpg'),
      text: "Blood donation campaign – Thank you heroes ❤️",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_DARK }}>
      <RNStatusBar barStyle="light-content" />

      <ScrollView style={{ flex: 1 }}>
        {/* 🔹 HEADER */}
        <HomeHeader setScreen={setScreen} />

        <StoriesBar openStory={openStory} />

        {/* 🔹 TAB SECTION */}
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => setSelectedTab('All Post')} style={styles.tabItem}>
            <Text style={[styles.tabText, selectedTab === 'All Post' && styles.activeTabText]}>All Post</Text>
            {selectedTab === 'All Post' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab('Following')} style={styles.tabItem}>
            <Text style={[styles.tabText, selectedTab === 'Following' && styles.activeTabText]}>Following</Text>
            {selectedTab === 'Following' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab('Event')} style={styles.tabItem}>
            <Text style={[styles.tabText, selectedTab === 'Event' && styles.activeTabText]}>Event</Text>
            {selectedTab === 'Event' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {posts.map((post, index) => (
          <LeoFeedPost key={index} {...post} onPress={() => setScreen('PostDetail')} />
        ))}
      </ScrollView>

      {/* ✅ FIXED BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setScreen('HomeFeed')}>
          <CustomAppIcon name="home-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('Search')}>
          <CustomAppIcon name="search-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('Notification')}>
          <CustomAppIcon name="notifications-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('Profile')}>
          <CustomAppIcon name="settings-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('EditProfile')}>
          <CustomAppIcon name="person-outline" size={26} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  welcomeText: {
    color: INACTIVE_TAB_COLOR,
    fontSize: 14,
  },
  userName: {
    color: TEXT_LIGHT,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    marginBottom: 15,
    marginTop: 5,
  },
  tabItem: {
    paddingVertical: 10,
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    color: INACTIVE_TAB_COLOR,
    fontSize: 15,
    fontWeight: '500',
  },
  activeTabText: {
    color: PRIMARY_GOLD,
  },
  activeIndicator: {
    height: 3,
    backgroundColor: PRIMARY_GOLD,
    width: '40%',
    marginTop: 8,
    borderRadius: 2,
  },

  feedPost: { marginBottom: 20, backgroundColor: SECONDARY_DARK, borderRadius: 10, marginHorizontal: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUserInfo: { flex: 1 },
  postUsername: { color: TEXT_LIGHT, fontWeight: 'bold' },
  postTime: { color: INACTIVE_TAB_COLOR, fontSize: 12 },
  postTextGold: { color: PRIMARY_GOLD, paddingHorizontal: 15 },
  feedPostImage: { width: '100%', height: width * 0.8 },
  postFooter: { padding: 15 },
  reactionIcons: { flexDirection: 'row', justifyContent: 'space-between', width: '70%' },
  likeText: { color: TEXT_LIGHT },
  viewCount: { color: INACTIVE_TAB_COLOR },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: SECONDARY_DARK,
  },
};

export default HomeFeedScreen;
