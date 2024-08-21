import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CoinIcon from '@/assets/images/Coin.svg';
import CoinSaver from '@/assets/images/coinsSaver.svg';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseRoutines } from '@/constants/Data';

const Rewards = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="chevron-back" size={20} color="#394B42" />
                </View>
                <Text style={styles.headerText}>My Rewards</Text>
                <View style={styles.emptyView} />
            </View>
            <View style={styles.coinsContainer}>
                <View style={styles.coinsInfo}>
                    <View style={styles.coinIconContainer}>
                        <CoinIcon />
                        <Text style={styles.coinsText}>10</Text>
                    </View>
                    <Text style={styles.coinsLabel}>Happiness coins</Text>
                </View>
                <CoinSaver />
            </View>
            <Pressable style={styles.continueButton} onPress={() => {
                router.replace({
                    pathname: '/(tabs)/'
                });
            }}>
                <Text style={styles.continueButtonText}>Go to home</Text>
            </Pressable>
        </View>
    );
};

export default Rewards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 134,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        backgroundColor: '#E0F3E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 30,
        height: 30,
        backgroundColor: '#F8FFF8',
        borderRadius: 32,
        position: 'absolute',
        left: 20,
        top: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'quickSandSemiBold',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 30,
        color: '#394B42',
    },
    emptyView: {
        width: 30
    },
    coinsContainer: {
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 20,
    },
    coinsInfo: {
        alignItems: 'center',
    },
    coinIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinsText: {
        fontFamily: 'quickSandBold',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 30,
        paddingLeft: 10,
        color: '#49AF7C',
    },
    coinsLabel: {
        fontFamily: 'quickSandSemiBold',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22.5,
        color: '#394B42',
        textAlign: 'center',
        marginVertical: 10
    },
    continueButton: {
        backgroundColor: 'rgba(73, 175, 124, 1)',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        borderRadius: 32,
        alignSelf: 'center',
        padding: 10,
    },
    continueButtonText: {
        fontFamily: 'quickSandMedium',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 25,
        color: '#FFFBFA',
    },
});
