import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BigCoinIcon from '@/assets/images/bigCoin.svg';
import CoinsIcon from '@/assets/images/coins.svg';
import { useRouter } from 'expo-router';

export default function CoinsScreen({ streakDays = 1 }) {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'rgba(224, 243, 224, 0.5)'} />
            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <CoinsIcon />
                <Text style={styles.iconText}>10</Text>
            </View>
            <View style={styles.streakContainer}>
                <BigCoinIcon />
            </View>
            <Text style={styles.streakValueText}>Yay!</Text>
            <View style={styles.weekContainer}>
                <Text style={styles.streakResetText}>You earned 10 hapiness coins.</Text>
            </View>
            <Pressable style={styles.continueButton} onPress={() => {
                router.push({
                    pathname: '/meditate/rewards'
                })
            }}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF9F6',
        alignItems: 'center',
    },
    streakContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: '30%',
    },
    streakText: {
        fontSize: 24,
        fontFamily: 'quickSandMedium',
        fontWeight: '600',
        color: '#394B42',
        lineHeight: 30,
        position: 'absolute',
        bottom: 6,
    },
    weekContainer: {
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 16,
        marginVertical: 20,
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayContainer: {
        alignItems: 'center',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'quickSandMedium',
        lineHeight: 17.5,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#E5E5E5',
        borderColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    separator: {
        borderColor: '#E5E5E5',
        borderWidth: 1,
        width: '100%',
        marginVertical: 20,
    },
    streakResetText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'quickSandSemiBold',
        fontSize: 24,
        fontWeight: '600',
        color: '#394B42'
    },
    continueButton: {
        backgroundColor: 'rgba(73, 175, 124, 1)',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        borderRadius: 32,
        position: 'absolute',
        bottom: 30,
        padding: 10,
    },
    continueButtonText: {
        fontFamily: 'quickSandMedium',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 25,
        color: '#FFFBFA',
    },
    streakValueText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#394B42',
        marginVertical: 10,
        fontFamily: 'quickSandSemiBold'
    },
    iconText: {
        fontSize: 14,
        color: '#394B42',
        paddingBottom: 6
    },
});
