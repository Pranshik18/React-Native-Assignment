import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bear from '@/assets/images/bear.svg';
import GoogleIcon from '@/assets/images/google.svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@/constants';
import { useToast } from '@/providers/ToastProvider';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
});

export default function LoginScreen() {
    const { setToken } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();

    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            setToken(googleCredential.token);
            showToast('Login successful!');

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            showToast(error?.message)
            console.log({ error })
        }
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome back to GoodLives</Text>
                <Bear style={styles.bearImage} />
                <Pressable onPress={onGoogleButtonPress} style={styles.socialButton}>
                    <Text style={styles.continueText}>Continue with</Text>
                    <GoogleIcon style={styles.googleIcon} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#FFFCF8'
    },
    textContainer: {
        paddingTop: '20%',
        alignItems: 'center'
    },
    welcomeText: {
        fontFamily: 'quickSandMedium',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 30,
        marginVertical: 20
    },
    bearImage: {
        marginVertical: 20
    },
    socialButton: {
        width: '90%',
        height: 55,
        marginVertical: 20,
        backgroundColor: '#E8EBFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#F8FFFB',
        gap: 13,
        padding: 10,
        flexDirection: 'row'
    },
    continueText: {
        fontFamily: 'quickSandMedium',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600'
    },
    googleIcon: {
        width: 24,
        height: 24
    }
})