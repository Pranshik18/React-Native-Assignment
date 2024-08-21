import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BlinkingDot = Animatable.createAnimatableComponent(View);

const ThreeDotLoader = () => {
    const animationConfig = {
        from: { opacity: 1 },
        to: { opacity: 0.3 },
    };

    return (
        <View style={styles.loaderContainer}>
            <BlinkingDot
                animation={animationConfig}
                iterationCount="infinite"
                style={styles.dot}
            />
            <BlinkingDot
                animation={animationConfig}
                iterationCount="infinite"
                style={styles.dot}
            />
            <BlinkingDot
                animation={animationConfig}
                iterationCount="infinite"
                style={styles.dot}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        height: '100%',
        backgroundColor: 'black',
    },
    dot: {
        width: 14,
        height: 14,
        marginHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'red', // Your desired color
    },
});

export default ThreeDotLoader;
