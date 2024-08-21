import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import SpaceIcon from '@/assets/images/spaceIcon.svg';
import EventsIcon from '@/assets/images/eventsIcon.svg';
import FriendsIcon from '@/assets/images/supportCircleIcon.svg';
import WellnessIcon from '@/assets/images/wellnessIcon.svg';

// Define a type for the icons
const icons: Record<string, React.FC<{ fill: string }>> = {
    index: SpaceIcon,
    tab2: EventsIcon,
    tab3: FriendsIcon,
    tab4: WellnessIcon,
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const activeIndex = state.index;
    const animatedIndex = useRef(new Animated.Value(state.index)).current;

    useEffect(() => {
        Animated.timing(animatedIndex, {
            toValue: state.index,
            duration: 300, // Duration of the animation
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        }).start();
    }, [state.index]);

    return (
        <View style={styles.outerContainer}>
            <Animated.View style={[styles.tabBar]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.title !== undefined ? options.title : route.name;
                    const Icon = icons[route.name];
                    const isActive = activeIndex === index;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={() => navigation.navigate(route.name)}
                            style={styles.tabItem}
                        >
                            <View style={styles.iconLabelContainer}>
                                {isActive && (
                                    <View style={styles.activeIconBackground}>
                                        <Icon fill="#FFFFFF" />
                                    </View>
                                )}
                                {!isActive && (
                                    <Icon fill={isActive ? "#49AF7C" : 'none'} />
                                )}
                                {isActive && (
                                    <>
                                        <Text style={styles.tabLabel}>{label}</Text>
                                        <View style={styles.greenLine} />
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#FFFCF8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeIconBackground: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#49AF7C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        marginLeft: 5,
        color: '#394B42',
    },
    greenLine: {
        position: 'absolute',
        bottom: -5, // Adjust as needed to place the line beneath the icon
        height: 4,
        width: '50%', // Adjust width as needed
        backgroundColor: '#49AF7C',
        borderRadius: 2,
    },
});

export default CustomTabBar;
