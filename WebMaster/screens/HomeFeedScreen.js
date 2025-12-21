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
  StyleSheet,
  Alert,
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

// --- MODAL COMPONENT ---
const CreatePostModal = ({ visible, onClose, onPost }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!caption || !image) {
      Alert.alert("Missing Info", "Please add both a caption and an image.");
      return;
    }
    onPost({ caption, image });
    setCaption('');
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>New Leo Post</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={TEXT_LIGHT} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={modalStyles.input}
            placeholder="What's happening in your club?"
            placeholderTextColor={INACTIVE_TAB_COLOR}
            multiline
            value={caption}
            onChangeText={setCaption}
          />

          <TouchableOpacity style={modalStyles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={modalStyles.previewImage} />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Icon name="image-outline" size={40} color={PRIMARY_GOLD} />
                <Text style={{ color: INACTIVE_TAB_COLOR }}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={modalStyles.submitButton} onPress={handlePost}>
            <Text style={modalStyles.submitButtonText}>Share Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// 🔹 HEADER
const HomeHeader = ({ setScreen }) => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
    </View>

    <View style={styles.headerIcons}>
      <TouchableOpacity style={{ marginRight: 18 }} onPress={() => setScreen('SearchScreen')}>
        <CustomAppIcon name="search-outline" size={22} color={PRIMARY_GOLD} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('NotificationScreen')}>
        <CustomAppIcon name="notifications-outline" size={22} color={PRIMARY_GOLD} />
      </TouchableOpacity>
    </View>
  </View>
);

// Story Circle
const StoryCircle = ({ label, uri, isNew = false, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', marginRight: 15 }}>
    <View style={[styles.storyBorder, { borderWidth: isNew ? 2 : 0 }]}>
      <Image source={uri} style={styles.storyImage} />
    </View>
    <Text style={{ color: TEXT_LIGHT, marginTop: 5, fontSize: 12 }}>{label}</Text>
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
      
      {/* Logic to handle both local assets and URI strings */}
      {image && (
        <Image 
          source={typeof image === 'string' ? { uri: image } : image} 
          style={styles.feedPostImage} 
        />
      )}

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [posts, setPosts] = useState([
    { name: "Leo District 306 D1", time: "08:39 am", views: "56", likes: "34", image: require('../assets/post1.jpg'), text: "LMP 2025 LMD 306 Rangers Is LIVE!" },
    { name: "Leo Club Colombo", time: "09:10 am", views: "42", likes: "28", image: require('../assets/post2.jpg'), text: "Successful beach cleanup project completed 🌊♻️" },
    { name: "Leo District 306 D2", time: "10:05 am", views: "78", likes: "51", image: require('../assets/post3.jpg'), text: "Leadership workshop highlights 💡🔥" },
    { name: "Leo Club Kandy", time: "11:20 am", views: "33", likes: "19", image: require('../assets/post4.jpg'), text: "Blood donation campaign – Thank you heroes ❤️" },
  ]);

  const handleCreatePost = (data) => {
    const newPost = {
      name: "Akarsha",
      time: "Just now",
      views: "0",
      likes: "0",
      image: data.image,
      text: data.caption,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_DARK }}>
      <RNStatusBar barStyle="light-content" />

      <CreatePostModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onPost={handleCreatePost}
      />

      <ScrollView style={{ flex: 1 }}>
        <HomeHeader setScreen={setScreen} />

        <StoriesBar openStory={openStory} />

        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createPostText}>Create Post</Text>
        </TouchableOpacity>

        <View style={styles.tabBar}>
          {['All Post', 'Following', 'Event'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={styles.tabItem}>
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
              {selectedTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {posts.map((post, index) => (
          <LeoFeedPost key={index} {...post} onPress={() => setScreen('PostDetail')} />
        ))}
      </ScrollView>

      {/* BOTTOM NAV - LINKED TO setScreen */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setScreen('HomeFeed')}>
          <CustomAppIcon name="home-outline" size={26} color={PRIMARY_GOLD} />
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
const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingTop: 10 },
  welcomeText: { color: INACTIVE_TAB_COLOR, fontSize: 14 },
  userName: { color: TEXT_LIGHT, fontSize: 22, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  createPostButton: { backgroundColor: PRIMARY_GOLD, marginHorizontal: 15, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  createPostText: { color: BG_DARK, fontWeight: 'bold', fontSize: 16 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, borderBottomColor: '#333', marginBottom: 15, marginTop: 5 },
  tabItem: { paddingVertical: 10, alignItems: 'center', flex: 1 },
  tabText: { color: INACTIVE_TAB_COLOR, fontSize: 15, fontWeight: '500' },
  activeTabText: { color: PRIMARY_GOLD },
  activeIndicator: { height: 3, backgroundColor: PRIMARY_GOLD, width: '40%', marginTop: 8, borderRadius: 2 },
  feedPost: { marginBottom: 20, backgroundColor: SECONDARY_DARK, borderRadius: 10, marginHorizontal: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUserInfo: { flex: 1 },
  postUsername: { color: TEXT_LIGHT, fontWeight: 'bold' },
  postTime: { color: INACTIVE_TAB_COLOR, fontSize: 12 },
  postTextGold: { color: PRIMARY_GOLD, paddingHorizontal: 15, marginBottom: 10, fontWeight: '600' },
  feedPostImage: { width: '100%', height: width * 0.8 },
  postFooter: { padding: 15 },
  reactionIcons: { flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginBottom: 10 },
  likeText: { color: TEXT_LIGHT, fontSize: 12 },
  viewCount: { color: INACTIVE_TAB_COLOR, fontSize: 12, marginTop: 4 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: SECONDARY_DARK, borderTopWidth: 0.5, borderTopColor: '#333' },
  storyBorder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderColor: PRIMARY_GOLD },
  storyImage: { width: 50, height: 50, borderRadius: 25 },
});

const modalStyles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: SECONDARY_DARK, width: '90%', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: '#333' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
  modalTitle: { color: PRIMARY_GOLD, fontSize: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#2A2A2A', color: TEXT_LIGHT, borderRadius: 8, padding: 12, textAlignVertical: 'top', height: 100, marginBottom: 15, fontSize: 16 },
  imagePicker: { height: 180, backgroundColor: '#2A2A2A', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden', borderStyle: 'dashed', borderWidth: 1, borderColor: INACTIVE_TAB_COLOR },
  previewImage: { width: '100%', height: '100%' },
  submitButton: { backgroundColor: PRIMARY_GOLD, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  submitButtonText: { color: BG_DARK, fontWeight: 'bold', fontSize: 16 },
});

export default HomeFeedScreen;
