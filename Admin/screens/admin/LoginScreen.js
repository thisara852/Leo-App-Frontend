import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Basic validation for Admin Access
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert("Access Denied", "Please enter valid administrator credentials.");
            return;
        }
        // Navigate to the Dashboard
        navigation.replace('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inner}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.glowCircle}>
                        <Icon name="shield-checkmark" size={60} color="#FFC700" />
                    </View>
                    <Text style={styles.title}>Authority Portal</Text>
                    <Text style={styles.subtitle}>Secure Administrator Access</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Icon name="mail-outline" size={20} color="#666" />
                        <TextInput 
                            style={styles.input}
                            placeholder="Admin Email"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Icon name="lock-closed-outline" size={20} color="#666" />
                        <TextInput 
                            style={styles.input}
                            placeholder="Security Key"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginText}>INITIALIZE SYSTEM</Text>
                        <Icon name="finger-print" size={20} color="#000" style={{marginLeft: 10}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Emergency Access Recovery</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>ENCRYPTED CONNECTION v2.0</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    inner: { flex: 1, padding: 30, justifyContent: 'center' },
    logoContainer: { alignItems: 'center', marginBottom: 50 },
    glowCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#FFC700',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#FFC700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
        marginBottom: 20
    },
    title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', letterSpacing: 1 },
    subtitle: { color: '#666', fontSize: 14, marginTop: 5 },
    inputContainer: { width: '100%' },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 60,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#222'
    },
    input: { flex: 1, color: '#FFF', marginLeft: 15, fontSize: 16 },
    loginBtn: {
        backgroundColor: '#FFC700',
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: { color: '#000', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
    forgotBtn: { marginTop: 20, alignItems: 'center' },
    forgotText: { color: '#444', fontSize: 12, fontWeight: 'bold' },
    footer: { position: 'absolute', bottom: 20, width: '100%', alignItems: 'center', alignSelf: 'center' },
    footerText: { color: '#222', fontSize: 10, letterSpacing: 2 }
});

export default LoginScreen;