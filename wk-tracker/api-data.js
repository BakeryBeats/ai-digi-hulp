/**
 * WK Tracker - Match Data & API Integration
 * Mock data for demonstration - connect to real API later
 */

// Mock match data
const mockMatches = [
    {
        id: 1,
        date: '2026-01-15',
        time: '14:00',
        status: 'upcoming',
        group: 'A',
        homeTeam: { name: 'Nederland', flag: '🇳🇱', code: 'NED' },
        awayTeam: { name: 'Argentinië', flag: '🇦🇷', code: 'ARG' },
        homeScore: null,
        awayScore: null
    },
    {
        id: 2,
        date: '2026-01-15',
        time: '17:00',
        status: 'upcoming',
        group: 'A',
        homeTeam: { name: 'Frankrijk', flag: '🇫🇷', code: 'FRA' },
        awayTeam: { name: 'Duitsland', flag: '🇩🇪', code: 'GER' },
        homeScore: null,
        awayScore: null
    },
    {
        id: 3,
        date: '2026-01-14',
        time: '20:00',
        status: 'finished',
        group: 'A',
        homeTeam: { name: 'Brazilië', flag: '🇧🇷', code: 'BRA' },
        awayTeam: { name: 'Spanje', flag: '🇪🇸', code: 'ESP' },
        homeScore: 2,
        awayScore: 1
    },
    {
        id: 4,
        date: '2026-01-14',
        time: '14:30',
        status: 'live',
        group: 'B',
        homeTeam: { name: 'Engeland', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG' },
        awayTeam: { name: 'België', flag: '🇧🇪', code: 'BEL' },
        homeScore: 1,
        awayScore: 0,
        minute: 67
    },
    {
        id: 5,
        date: '2026-01-13',
        time: '18:00',
        status: 'finished',
        group: 'B',
        homeTeam: { name: 'Portugal', flag: '🇵🇹', code: 'POR' },
        awayTeam: { name: 'Italien', flag: '🇮🇹', code: 'ITA' },
        homeScore: 3,
        awayScore: 0
    }
];

// Mock standings data
const mockStandings = {
    'A': [
        { pos: 1, team: 'Brazilië', flag: '🇧🇷', code: 'BRA', played: 2, wins: 2, draws: 0, losses: 0, points: 6 },
        { pos: 2, team: 'Nederland', flag: '🇳🇱', code: 'NED', played: 1, wins: 1, draws: 0, losses: 0, points: 3 },
        { pos: 3, team: 'Spanje', flag: '🇪🇸', code: 'ESP', played: 1, wins: 0, draws: 0, losses: 1, points: 0 },
        { pos: 4, team: 'Argentinië', flag: '🇦🇷', code: 'ARG', played: 0, wins: 0, draws: 0, losses: 0, points: 0 }
    ],
    'B': [
        { pos: 1, team: 'Engeland', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG', played: 1, wins: 1, draws: 0, losses: 0, points: 3 },
        { pos: 2, team: 'Portugal', flag: '🇵🇹', code: 'POR', played: 1, wins: 1, draws: 0, losses: 0, points: 3 },
        { pos: 3, team: 'België', flag: '🇧🇪', code: 'BEL', played: 1, wins: 0, draws: 0, losses: 1, points: 0 },
        { pos: 4, team: 'Italien', flag: '🇮🇹', code: 'ITA', played: 1, wins: 0, draws: 0, losses: 1, points: 0 }
    ],
    'C': [
        { pos: 1, team: 'Frankrijk', flag: '🇫🇷', code: 'FRA', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 2, team: 'Uruguay', flag: '🇺🇾', code: 'URU', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 3, team: 'Denemarken', flag: '🇩🇰', code: 'DEN', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 4, team: 'Marokko', flag: '🇲🇦', code: 'MAR', played: 0, wins: 0, draws: 0, losses: 0, points: 0 }
    ],
    'D': [
        { pos: 1, team: 'Duitsland', flag: '🇩🇪', code: 'GER', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 2, team: 'Japan', flag: '🇯🇵', code: 'JPN', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 3, team: 'Canada', flag: '🇨🇦', code: 'CAN', played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
        { pos: 4, team: 'Costa Rica', flag: '🇨🇷', code: 'CRC', played: 0, wins: 0, draws: 0, losses: 0, points: 0 }
    ]
};

// Mock player stats
const mockPlayerStats = {
    topScorers: [
        { name: 'Neymar', country: 'Brazilië', flag: '🇧🇷', goals: 3 },
        { name: 'Mbappé', country: 'Frankrijk', flag: '🇫🇷', goals: 2 },
        { name: 'Ronaldo', country: 'Portugal', flag: '🇵🇹', goals: 2 }
    ],
    topKeepers: [
        { name: 'Ederson', country: 'Brazilië', flag: '🇧🇷', saves: 8 },
        { name: 'Pickford', country: 'Engeland', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', saves: 6 },
        { name: 'Courtois', country: 'België', flag: '🇧🇪', saves: 4 }
    ],
    topAssists: [
        { name: 'Rodri', country: 'Spanje', flag: '🇪🇸', assists: 2 },
        { name: 'Vinicius Jr', country: 'Brazilië', flag: '🇧🇷', assists: 2 },
        { name: 'Son', country: 'Zuid-Korea', flag: '🇰🇷', assists: 1 }
    ],
    topYellows: [
        { name: 'Pepe', country: 'Portugal', flag: '🇵🇹', yellows: 2 },
        { name: 'Busquets', country: 'Spanje', flag: '🇪🇸', yellows: 1 },
        { name: 'Maguire', country: 'Engeland', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', yellows: 1 }
    ]
};

// Mock fantasy leaderboard
const mockLeaderboard = [
    { rank: 1, name: 'Max', points: 425, teamCount: 11 },
    { rank: 2, name: 'Emma', points: 398, teamCount: 11 },
    { rank: 3, name: 'Luc', points: 387, teamCount: 11 },
    { rank: 4, name: 'Sofia', points: 365, teamCount: 11 },
    { rank: 5, name: 'Jelle', points: 342, teamCount: 11 }
];

// Get data functions
function getAllMatches() {
    return mockMatches;
}

function getMatchesByStatus(status) {
    return mockMatches.filter(match => match.status === status);
}

function getStandings(group) {
    return mockStandings[group] || [];
}

function getPlayerStats() {
    return mockPlayerStats;
}

function getLeaderboard() {
    return mockLeaderboard;
}

// Update function for real API (to be implemented)
async function fetchFromRealAPI() {
    // This would connect to a real football API like:
    // - API-FOOTBALL (RapidAPI)
    // - ESPN API
    // - Official FIFA API
    // For now, we use mock data
    return {
        matches: getAllMatches(),
        standings: mockStandings,
        stats: getPlayerStats(),
        leaderboard: getLeaderboard()
    };
}
