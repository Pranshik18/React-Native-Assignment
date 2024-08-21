import { Image, StyleSheet, SectionList, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Card from '@/components/card/Card';
import { ExerciseRoutines } from '@/constants/Data';
import { SafeAreaView } from 'react-native-safe-area-context';
import StreakIcon from '@/assets/images/streak.svg';
import CoinsIcon from '@/assets/images/coins.svg';
import BellIcon from '@/assets/images/notificationBell.svg';
import MenuIcon from '@/assets/images/menuIcon.svg';
import FriendsGroupImage from '@/assets/images/friendsGroup.svg';
import RefreshIcon from '@/assets/images/refresh.svg';
import InfoIcon from '@/assets/images/information.svg'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';

export default function HomeScreen() {
  const router = useRouter();
  const focused = useIsFocused();
  const { rewardCoins, streakDays } = useAuth();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const displayName = currentUser.displayName?.split(' ')?.[0];
        setUser(displayName || '');
        setEmail(currentUser?.email || '');
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [focused]);

  const onCardPress = ({ item }: any) => {
    router.push({
      pathname: '/meditate/meditation',
      params: {
        id: item.id?.toString(),
        duration: item?.duration?.toString()
      }
    })
  }
  return (
    <SafeAreaView style={styles.mainView}>
      <ParallaxScrollView
        headerImage={
          <ImageBackground
            source={require('@/assets/images/homeBackground.png')}
            style={styles.greetingContainer}
            resizeMode="stretch"
          >
            {/* Icons Section */}
            <View style={styles.iconsContainer}>
              <View>
                <MenuIcon style={{}} />
              </View>
              <View style={styles.iconItem}>
                <StreakIcon style={styles.icon} />
                <Text style={styles.iconText}>{streakDays}</Text>
              </View>
              <View style={styles.iconItem}>
                <CoinsIcon style={styles.icon} />
                <Text style={styles.iconText}>{rewardCoins}</Text>
              </View>
              <View style={styles.iconItem}>
                <BellIcon style={styles.icon} />
              </View>
            </View>
            <Text style={styles.greetingText}>Hey {user ? user : email} 👋</Text>
            <Text style={styles.subtitle}>Begin your healing journey</Text>

            {/* Confidential Therapy Section */}
            <View style={styles.confidentialContainer}>
              <FriendsGroupImage style={styles.friendsIcon} />
              <Text style={styles.confidentialText}>Completely confidential</Text>
            </View>
            <TouchableOpacity style={styles.therapistButton}>
              <Text style={styles.therapistButtonText}>Find my therapist</Text>
            </TouchableOpacity>
          </ImageBackground>
        }
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#FFF' }}
      >
        <View style={styles.dailyView}>
          <View style={styles.dailyTextView}>
            <Text style={styles.dailyText}>Daily Routine</Text>
            <Text>{rewardCoins}</Text>
          </View>
          <View style={styles.iconsView}>
            <RefreshIcon />
            <InfoIcon />
          </View>
        </View>
        {/* Daily Routine Section */}
        <SectionList
          sections={ExerciseRoutines}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item, index }) => (
            <Card item={item} onPress={() => onCardPress({ item })} index={index} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <ThemedText style={styles.header}>{title}</ThemedText>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <View style={styles.separator} />
            </View>
          )}
        />
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  greetingContainer: {
    width: '100%',
    height: 400,
    backgroundColor: 'white'
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'quickSandMedium',
    color: '#394B42',
    alignSelf: 'center',
    width: '85%',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'quickSandRegular',
    color: '#394B42',
    alignSelf: 'center',
    marginVertical: 10,
  },
  confidentialContainer: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  confidentialText: {
    fontSize: 14,
    color: '#394B42',
    marginVertical: 10,
  },
  therapistButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 250,
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 6
  },
  therapistButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'quickSandBold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  iconText: {
    fontSize: 14,
    color: '#394B42',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'quickSandMedium',
    lineHeight: 25,
    color: '#394B42',
    marginVertical: 10,
  },
  separatorContainer: {
    paddingLeft: 24,
  },
  separator: {
    height: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
    marginVertical: 2,
  },
  friendsIcon: {
    marginBottom: 10,
  },
  dailyView: {
    flexDirection: 'row',
    width: '100%'
  },
  dailyTextView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '88%'
  },
  dailyText: {
    marginRight: 20
  },
  iconsView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  }
});
