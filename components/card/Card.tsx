import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import Tick from '@/assets/images/tick.svg'
import FeatherIcon from '@expo/vector-icons/Feather';
import { useAuth } from '@/providers/AuthProvider';

const Card = ({ item, onPress, index }: any) => {
    const { completedExercises } = useAuth();
    const isCompleted = completedExercises[item.id] || false;
    const isMorningRoutineIndex = true;
    return (
        <Pressable style={[styles.item, { backgroundColor: item?.cardColor }]} onPress={onPress}>
            <View style={styles.circleContainer}>
                {isMorningRoutineIndex ? <View style={styles.outerCircle}>
                    {!isCompleted ? <View style={styles.innerCircle} /> : <Tick />}
                </View> :
                    <View style={styles.innerCircle} />
                }
            </View>
            <View style={styles.textContainer}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
                <View style={styles.detailsContainer}>
                    <ThemedText style={styles.duration}>{item.duration} min</ThemedText>
                    <FeatherIcon name="feather" size={16} color="#7f91a8" style={styles.icon} />
                    <View style={styles.coinsView}>
                        <ThemedText style={styles.coins}>{item.coinsEarned}</ThemedText>
                        <FeatherIcon name="star" size={16} color="#ffc107" style={styles.icon} />
                    </View>
                </View>
            </View>
            <item.logo width={80} height={80} style={styles.logo} />
        </Pressable>
    );
};

export default Card;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 14,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 32,
        backgroundColor: '#fff',
    },
    outerCircle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 252, 248, 0.54)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff', // White inner circle
    },
    textContainer: {
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#394B42',
        fontFamily: 'quickSandBold',
    },
    description: {
        fontSize: 14,
        fontWeight: '500',
        color: '#394B42',
        fontFamily: 'quickSandRegular',
    },
    detailsContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    duration: {
        fontSize: 16,
        fontWeight: '600',
        color: '#394B42',
        fontFamily: 'quickSandBold',
        lineHeight: 20
    },
    coins: {
        fontSize: 14,
        color: '#05091A',
        lineHeight: 17.5,
        fontFamily: 'quickSandRegular',
        fontWeight: '400',
    },
    coinsView: { position: 'absolute', right: 10, flexDirection: 'row' },
    icon: {
        marginHorizontal: 4,
    },
});
