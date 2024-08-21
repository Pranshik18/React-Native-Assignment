import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

interface ToastProps {
    message: string;
    visible: boolean;
    duration?: number; // Duration in ms for how long the toast should be visible
}

const { width } = Dimensions.get('window');

export default function Toast({ message, visible, duration = 3000 }: ToastProps) {
    const toastHeight = 60; // Adjust the height as needed
    const offset = useSharedValue(-toastHeight);

    useEffect(() => {
        if (visible) {
            offset.value = withTiming(0, { duration: 500 });
            offset.value = withDelay(duration, withTiming(-toastHeight, { duration: 500 }));
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value }],
        };
    });

    return (
        <Animated.View style={[styles.toastContainer, animatedStyle]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 0,
        width: width * 0.9,
        left: width * 0.05,
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    toastText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
    },
});
