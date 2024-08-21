import Toast from "react-native-toast-message";

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // Format as minutes:seconds
};

export const showToast = (text: string, duration = 4000, type = 'success', text1Style = {}) => {
    Toast.show({
        text1: text,
        position: 'bottom', // Position of the toast (bottom, top, or center)
        type: type, // Toast type (success, error, info)
        visibilityTime: duration, // Duration in milliseconds
        autoHide: true, // Whether to auto-hide the toast after visibilityTime
        text1Style: text1Style, // Custom text style
    });
};