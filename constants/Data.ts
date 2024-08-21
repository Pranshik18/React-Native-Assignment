import Logo1 from '@/assets/images/logoOne.svg';
import Logo2 from '@/assets/images/logoTwo.svg';
import Logo3 from '@/assets/images/logoThree.svg';

export const ExerciseRoutines = [
    {
        title: 'Morning',
        data: [
            {
                id: 1,
                name: 'Morning Meditation 1',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo1,
                cardColor: '#C5CFFF',
                finish: false,  // Add finish key
            },
            {
                id: 2,
                name: 'Morning Meditation 2',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo1,
                cardColor: '#C5CFFF',
                finish: false,  // Add finish key
            },
        ],
    },
    {
        title: 'Afternoon',
        data: [
            {
                id: 3,
                name: 'Afternoon Meditation 1',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo2,
                cardColor: '#FFE9AA',
                finish: false,  // Add finish key
            },
            {
                id: 4,
                name: 'Afternoon Meditation 2',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo2,
                cardColor: '#FFE9AA',
                finish: false,  // Add finish key
            },
        ],
    },
    {
        title: 'Evening',
        data: [
            {
                id: 5,
                name: 'Evening Meditation 1',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo3,
                cardColor: '#C4EED9',
                finish: false,  // Add finish key
            },
            {
                id: 6,
                name: 'Evening Meditation 2',
                description: 'Affirmation for day',
                duration: 6,
                coinsEarned: 10,
                logo: Logo3,
                cardColor: '#C4EED9',
                finish: false,  // Add finish key
            },
        ],
    },
];
