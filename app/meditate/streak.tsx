import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StreakIcon from '@/assets/images/streakDone.svg';
import TickIcon from '@/assets/images/check.svg';
import { useRouter } from 'expo-router';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function StreakScreen({ streakDays = 1 }) {
    const router = useRouter();
    const currentDayIndex = new Date().getDay() - 1; // Sunday is 0, adjust to 0-6 (Mon-Sun)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'rgba(224, 243, 224, 0.5)'} />
            <View style={styles.streakContainer}>
                <StreakIcon />
                <Text style={styles.streakText}>{streakDays}</Text>
            </View>
            <Text style={styles.streakValueText}>Day streak!</Text>
            <View style={styles.weekContainer}>
                <View style={styles.weekDaysContainer}>
                    {daysOfWeek.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                            <Text style={[styles.dayText, { color: index === currentDayIndex ? '#49AF7C' : '#394B42' }]}>{day}</Text>
                            <View style={[styles.circle, { backgroundColor: index === currentDayIndex ? 'green' : 'transparent' }]}>
                                {index === currentDayIndex && <TickIcon />}
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.separator} />
                <Text style={styles.streakResetText}>Streak will reset if you don’t practice tomorrow.</Text>
            </View>
            <Pressable style={styles.continueButton} onPress={() => router.push('/meditate/coins')}>
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
        marginTop: '20%',
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
        borderWidth: 1,
        borderColor: 'black',
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
        width: '70%',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'quickSandMedium',
        fontSize: 16,
        fontWeight: '500',
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
        marginVertical: 20,
        fontFamily: 'quickSandSemiBold'
    }
});
