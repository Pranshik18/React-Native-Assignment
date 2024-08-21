import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useRouter
import PlayIcon from '@/assets/images/playIcon.svg';
import PauseIcon from '@/assets/images/pauseIcon.svg';
import BearIcon from '@/assets/images/meditateBear.svg';
import ShareIcon from '@/assets/images/shareIcon.svg';
import BackIcon from '@/assets/images/backwardStep.svg';
import ForwardIcon from '@/assets/images/sloth.svg';
import { formatTime } from '@/utils';

export default function TimerScreen() {
    const params = useLocalSearchParams();
    const { duration: durationStr, id } = params;
    // Convert duration from minutes (string) to seconds
    const duration = parseInt(durationStr as string, 10) * 60;
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [breathingPhase, setBreathingPhase] = useState('Inhale');
    const progress = useSharedValue(0);
    const circleSize = useSharedValue(150);
    const translateY = useSharedValue(0); // Shared value for Y translation
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        let interval;

        if (isPlaying) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= duration) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return duration;
                    }
                    // Check if 80% of the timer has elapsed
                    if (newTime >= 0.8 * duration) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        router.push({
                            pathname: '/meditate/streak',
                            params: {
                                id
                            }
                        }); // Navigate to Rewards screen
                        return duration;
                    }
                    return newTime;
                });
            }, 1000);
        } else if (!isPlaying && elapsedTime !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPlaying, elapsedTime, duration, router]); // Added router

    useEffect(() => {
        progress.value = withTiming(elapsedTime / duration, { duration: 1000 });
    }, [elapsedTime]);

    useEffect(() => {
        if (isPlaying) {
            const breathingPhases = ['Inhale', 'Hold', 'Exhale'];
            let phaseIndex = 0;

            const breathingInterval = setInterval(() => {
                setBreathingPhase(breathingPhases[phaseIndex]);

                // Animating the circle size and Y position according to the breathing phase
                if (breathingPhases[phaseIndex] === 'Inhale') {
                    circleSize.value = withTiming(150, { duration: 2000 });
                    translateY.value = withTiming(0, { duration: 2000 });
                } else if (breathingPhases[phaseIndex] === 'Hold') {
                    circleSize.value = withTiming(180, { duration: 2000 });
                    translateY.value = withTiming(10, { duration: 2000 });
                } else if (breathingPhases[phaseIndex] === 'Exhale') {
                    circleSize.value = withTiming(200, { duration: 2000 });
                    translateY.value = withTiming(20, { duration: 2000 });
                }

                phaseIndex = (phaseIndex + 1) % breathingPhases.length;
            }, 3000);

            return () => clearInterval(breathingInterval);
        }
    }, [isPlaying]);

    const circleStyle = useAnimatedStyle(() => {
        return {
            width: circleSize.value,
            height: circleSize.value,
            borderRadius: circleSize.value / 2,
            backgroundColor: "rgba(196, 238, 217, 1)",
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY: translateY.value }],
        };
    });

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `I'm doing a meditation exercise of ${formatTime(duration)} minutes. Join me!`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.meditationContainer}>
                <Animated.View style={[styles.circleBackground, circleStyle]}>
                    <BearIcon style={styles.icon} />
                </Animated.View>
            </View>
            <Text style={styles.breathingText}>{breathingPhase}</Text>

            <View style={styles.progressContainer}>
                <Slider
                    style={styles.slider}
                    value={elapsedTime}
                    minimumValue={0}
                    maximumValue={duration}
                    thumbTintColor="#394B42"
                    minimumTrackTintColor="#394B42"
                    maximumTrackTintColor="#E0E0E0"
                    onValueChange={(value) => setElapsedTime(value)}
                />
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(Number(elapsedTime.toFixed(0)))}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>
            <View style={styles.controlsContainer}>
                <View />
                <BackIcon />
                <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </TouchableOpacity>
                <ForwardIcon />
                <ShareIcon style={styles.shareIcon} onPress={handleShare} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF9F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBackground: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 100,
        height: 100,
    },
    breathingText: {
        fontSize: 24,
        fontWeight: '600',
        marginVertical: 20,
        color: '#394B42',
    },
    progressContainer: {
        width: '99%',
        marginVertical: 20,
        alignItems: 'center'
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%'
    },
    meditationContainer: { height: 220, alignItems: 'center', justifyContent: 'center' },
    timeText: {
        fontSize: 14,
        color: '#394B42',
        marginHorizontal: 8
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    shareIcon: {},
    playPauseButton: {
        backgroundColor: "rgba(232, 253, 242, 1)",
        width: 66,
        height: 66,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
