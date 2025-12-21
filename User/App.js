import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

// --- Imports ---
import SplashScreen from './Screens/SplashScreen'; 
import OnboardingFlow from './Screens/OnboardingFlow';
import AuthScreen from './Screens/AuthScreen';
import CompleteProfileScreen from './Screens/CompleteProfileScreen';
import HomeFeedScreen from './Screens/HomeFeedScreen';
import PostDetailScreen from './Screens/PostDetailScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from './Screens/EditProfile';
import SearchScreen from './Screens/SearchScreen';
import NotificationScreen from './Screens/NotificationScreen';
import StoryViewScreen from './Screens/StoryViewScreen';
import DistrictScreen from './Screens/District';
import ClubsScreen from './Screens/Clubs';
import SettingScreen from './Screens/SettingScreen'; // Ensure this path matches your file name

const App = () => {
  const [screen, setScreen] = useState('Splash');
  const [storyImage, setStoryImage] = useState(null);
  const [params, setParams] = useState(null);

  const navigate = (name, screenParams = null) => {
    setParams(screenParams);
    setScreen(name);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'Splash': return <SplashScreen setScreen={navigate} />;
      case 'Onboarding': return <OnboardingFlow setScreen={navigate} />;
      case 'Auth':
      case 'Login': return <AuthScreen onLoginSuccess={() => navigate('CompleteProfile')} setScreen={navigate} />;
      case 'CompleteProfile': return <CompleteProfileScreen setScreen={navigate} />;
      case 'HomeFeed': return <HomeFeedScreen setScreen={navigate} openStory={(img) => { setStoryImage(img); navigate('StoryView'); }} />;
      case 'PostDetail': return <PostDetailScreen setScreen={navigate} params={params} />;
      case 'Profile': return <ProfileScreen setScreen={navigate} />;
      case 'EditProfile': return <EditProfileScreen setScreen={navigate} />;
      case 'Search': return <SearchScreen setScreen={navigate} />;
      case 'Notification': return <NotificationScreen setScreen={navigate} />;
      case 'Setting': return <SettingScreen setScreen={navigate} />; // Added this case
      case 'StoryView': return <StoryViewScreen storyImage={storyImage} onClose={() => navigate('HomeFeed')} setScreen={navigate} />;
      case 'District': return <DistrictScreen setScreen={navigate} districtId={params?.districtId} />;
      case 'Clubs': return <ClubsScreen setScreen={navigate} clubId={params?.clubId} />;
      default: return <HomeFeedScreen setScreen={navigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
