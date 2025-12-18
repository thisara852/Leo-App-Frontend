import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/OnboardingFlow';
import AuthScreen from './screens/AuthScreen';
import CompleteProfileScreen from './screens/CompleteProfileScreen';
import HomeFeedScreen from './screens/HomeFeedScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfile';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import StoryViewScreen from './screens/StoryViewScreen';

// New Screens
import DistrictScreen from './screens/District';
import ClubsScreen from './screens/Clubs';

// Styles
import { styles } from './styles';

const App = () => {
  const [screen, setScreen] = useState('Splash');
  const [storyImage, setStoryImage] = useState(null);
  const [params, setParams] = useState(null);

  // ✅ CENTRAL NAVIGATION FUNCTION
  const navigate = (screenName, screenParams = null) => {
    setParams(screenParams);
    setScreen(screenName);
  };

  const handleAuthSuccess = () => navigate('CompleteProfile');

  const handleIconClick = (icon) => {
    if (icon === 'Profile') navigate('EditProfile');
    if (icon === 'Setting') navigate('Profile'); // Navigates to Settings page
  };

  const openStory = (imageUri) => {
    setStoryImage(imageUri);
    navigate('StoryView');
  };

  const closeStory = () => {
    setStoryImage(null);
    navigate('HomeFeed');
  };

  // 🔥 RENDER LOGIC
  const renderScreen = () => {
    switch (screen) {
      case 'Splash':
        return <SplashScreen setScreen={navigate} />;

      case 'Onboarding':
        return <OnboardingFlow setScreen={navigate} />;

      // ✅ FIX: Added 'Login' case back so your old navigation calls don't break
      case 'Auth': 
      case 'Login': 
        return (
          <AuthScreen
            onLoginSuccess={handleAuthSuccess}
            onSignupSuccess={handleAuthSuccess}
          />
        );

      case 'CompleteProfile':
        return <CompleteProfileScreen setScreen={navigate} />;

      case 'HomeFeed':
        return (
          <HomeFeedScreen
            setScreen={navigate}
            openStory={openStory}
            handleIconClick={handleIconClick}
          />
        );

      case 'PostDetail':
        return <PostDetailScreen setScreen={navigate} />;

      case 'Profile': // This is your Settings screen
        return <ProfileScreen setScreen={navigate} />;

      case 'EditProfile':
        return <EditProfileScreen setScreen={navigate} />;

      case 'Search':
        return <SearchScreen setScreen={navigate} />;

      case 'Notification':
        return <NotificationScreen setScreen={navigate} />;

      case 'StoryView':
        return (
          <StoryViewScreen
            storyImage={storyImage}
            onClose={closeStory}
            setScreen={navigate}
          />
        );

      case 'District':
        return (
          <DistrictScreen
            setScreen={navigate}
            districtId={params?.districtId}
            districtName={params?.districtName}
          />
        );

      case 'Clubs':
        return (
          <ClubsScreen
            setScreen={navigate}
            clubId={params?.clubId}
            clubName={params?.clubName}
          />
        );

      default:
        // Fallback to HomeFeed if screen name is not recognized
        return (
          <HomeFeedScreen
            setScreen={navigate}
            openStory={openStory}
            handleIconClick={handleIconClick}
          />
        );
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {renderScreen()}
    </View>
  );
};

export default App;
