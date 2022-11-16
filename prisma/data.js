const users = [
    {
        name: 'Jackson',
        'profile_photo': null
    },
    {
        name: 'Liza',
        'profile_photo': null
    },
];

const challenges = [
    {
        name: '100 Day Challenge',
        'start_date': '2022-10-15T00:00:01.001Z',
        days: 100
    }
];

const completions = [
    {
        'user_id': 7,
        'challenge_id': 2,
        day: 1  
    },
    {
        'user_id': 7,
        'challenge_id': 2,
        day: 30   
    },
    {
        'user_id': 7,
        'challenge_id': 2,
        day: 31   
    },
    {
        'user_id': 8,
        'challenge_id': 2,
        day: 4   
    },
    {
        'user_id': 8,
        'challenge_id': 2,
        day: 5   
    }
]

module.exports = {
  users,
  challenges,
  completions
};