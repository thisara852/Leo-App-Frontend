// screens/SplashScreen.jsimport React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Standardizing colors to match your theme
const PRIMARY_GOLD = "#FFC700";

const SplashScreen = ({ setScreen }) => {
  useEffect(() => {
    // Navigate to Onboarding after 2 seconds
    const timer = setTimeout(() => {
      if (setScreen) {
        setScreen('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          // Prevents crash if logo.png is missing from the assets folder
          onError={() => console.warn("Logo image not found in assets/logo.png")}
        />
        <Text style={styles.title}>LeoConnect</Text>
        <Text style={styles.subtitle}>Sri Lanka</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: PRIMARY_GOLD,
    marginTop: 5,
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;
