/**
 * WK Tracker - Main JavaScript
 * Handles all UI interactions and data rendering
 */

// ===================================
// State Management
// ===================================

let currentSection = 'home';
let currentGroup = 'A';
let currentFilter = 'all';
let userTeam = null;
let allMatches = [];

// DOM Elements
const elements = {
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.section'),
    upcomingMatches: document.getElementById('upcomingMatches'),
    recentResults: document.getElementById('recentResults'),
    matchesContainer: document.getElementById('matchesContainer'),
    standingsBody: document.getElementById('standingsBody'),
    topScorers: document.getElementById('topScorers'),
    topKeepers: document.getElementById('topKeepers'),
    topAssists: document.getElementById('topAssists'),
    topYellows: document.getElementById('topYellows'),
    leaderboard: document.getElementById('leaderboard'),
    updateTime: document.getElementById('updateTime'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    groupBtns: document.querySelectorAll('.group-btn'),
    createTeamBtn: document.getElementById('createTeamBtn'),
    fantasyContent: document.getElementById('fantasyContent')
};

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadData();
    updateLastUpdated();
    setInterval(updateLastUpdated, 60000); // Update every minute
}

function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            switchSection(section);
        });
    });

    // Filter buttons
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMatches();
        });
    });

    // Group buttons
    elements.groupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.groupBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGroup = btn.dataset.group;
            renderStandings();
        });
    });

    // Fantasy button
    if (elements.createTeamBtn) {
        elements.createTeamBtn.addEventListener('click', createFantasyTeam);
    }
}

// ===================================
// Section Management
// ===================================

function switchSection(section) {
    // Update active section
    elements.sections.forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    // Update active nav link
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });

    currentSection = section;

    // Render section-specific content
    if (section === 'matches') renderMatches();
    if (section === 'standings') renderStandings();
    if (section === 'stats') renderStats();
}

// ===================================
// Data Loading
// ===================================

async function loadData() {
    try {
        const data = await fetchFromRealAPI();
        allMatches = data.matches;
        renderHome();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ===================================
// Rendering Functions
// ===================================

function renderHome() {
    renderUpcomingMatches();
    renderRecentResults();
}

function renderUpcomingMatches() {
    const upcoming = getMatchesByStatus('upcoming').slice(0, 3);
    elements.upcomingMatches.innerHTML = upcoming
        .map(match => createMatchCard(match))
        .join('');
}

function renderRecentResults() {
    const finished = getMatchesByStatus('finished');
    elements.recentResults.innerHTML = finished
        .map(match => createResultItem(match))
        .join('');
}

function renderMatches() {
    let matches = allMatches;

    if (currentFilter === 'upcoming') {
        matches = getMatchesByStatus('upcoming');
    } else if (currentFilter === 'live') {
        matches = getMatchesByStatus('live');
    } else if (currentFilter === 'finished') {
        matches = getMatchesByStatus('finished');
    }

    elements.matchesContainer.innerHTML = matches
        .map(match => createMatchCard(match))
        .join('');
}

function renderStandings() {
    const standings = getStandings(currentGroup);
    elements.standingsBody.innerHTML = standings
        .map(team => `
            <tr>
                <td>${team.pos}</td>
                <td>
                    <div class="team-cell">
                        <span class="team-cell-flag">${team.flag}</span>
                        <span>${team.team}</span>
                    </div>
                </td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td><strong>${team.points}</strong></td>
            </tr>
        `)
        .join('');
}

function renderStats() {
    const stats = getPlayerStats();
    
    elements.topScorers.innerHTML = stats.topScorers
        .map(player => `
            <div class="stat-item">
                <div class="stat-item-name">
                    <strong>${player.name}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${player.flag} ${player.country}</div>
                </div>
                <div class="stat-item-value">${player.goals}</div>
            </div>
        `)
        .join('');

    elements.topKeepers.innerHTML = stats.topKeepers
        .map(player => `
            <div class="stat-item">
                <div class="stat-item-name">
                    <strong>${player.name}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${player.flag} ${player.country}</div>
                </div>
                <div class="stat-item-value">${player.saves}</div>
            </div>
        `)
        .join('');

    elements.topAssists.innerHTML = stats.topAssists
        .map(player => `
            <div class="stat-item">
                <div class="stat-item-name">
                    <strong>${player.name}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${player.flag} ${player.country}</div>
                </div>
                <div class="stat-item-value">${player.assists}</div>
            </div>
        `)
        .join('');

    elements.topYellows.innerHTML = stats.topYellows
        .map(player => `
            <div class="stat-item">
                <div class="stat-item-name">
                    <strong>${player.name}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${player.flag} ${player.country}</div>
                </div>
                <div class="stat-item-value">${player.yellows} 🟨</div>
            </div>
        `)
        .join('');
}

// ===================================
// Card & Item Creators
// ===================================

function createMatchCard(match) {
    const statusClass = match.status === 'live' ? 'live' : '';
    const statusText = match.status === 'live' 
        ? `🔴 LIVE - ${match.minute}'`
        : match.status === 'upcoming'
        ? '⏰ Komend'
        : '✅ Afgelopen';

    return `
        <div class="match-card ${statusClass}">
            <div class="match-status ${match.status === 'live' ? 'live' : ''}">${statusText}</div>
            <div class="match-time">${formatDate(match.date)} om ${match.time}</div>
            
            <div class="match-teams">
                <div class="team">
                    <div class="team-flag">${match.homeTeam.flag}</div>
                    <div class="team-name">${match.homeTeam.name}</div>
                </div>
                
                <div class="score">
                    ${match.homeScore !== null ? `${match.homeScore}<span class="score-vs">-</span>${match.awayScore}` : 'VS'}
                </div>
                
                <div class="team">
                    <div class="team-flag">${match.awayTeam.flag}</div>
                    <div class="team-name">${match.awayTeam.name}</div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                Poule ${match.group}
            </div>
        </div>
    `;
}

function createResultItem(match) {
    return `
        <div class="result-item">
            <div class="result-teams">
                <span>${match.homeTeam.flag} ${match.homeTeam.name}</span>
                <span style="color: var(--text-secondary); margin: 0 0.5rem;">vs</span>
                <span>${match.awayTeam.flag} ${match.awayTeam.name}</span>
            </div>
            <div class="result-score">${match.homeScore} - ${match.awayScore}</div>
        </div>
    `;
}

// ===================================
// Fantasy Functions
// ===================================

function createFantasyTeam() {
    userTeam = {
        name: prompt('Geef je team een naam:'),
        players: [],
        points: 0
    };

    if (userTeam.name) {
        localStorage.setItem('wkFantasyTeam', JSON.stringify(userTeam));
        alert(`Team '${userTeam.name}' aangemaakt!`);
        renderLeaderboard();
    }
}

function renderLeaderboard() {
    const leaderboard = getLeaderboard();
    elements.leaderboard.innerHTML = leaderboard
        .map((entry, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'first';
            else if (index === 1) rankClass = 'second';
            else if (index === 2) rankClass = 'third';

            return `
                <div class="leaderboard-item">
                    <div class="leaderboard-rank ${rankClass}">#${entry.rank}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${entry.name}</div>
                        <div class="leaderboard-team">${entry.teamCount} spelers</div>
                    </div>
                    <div class="leaderboard-points">${entry.points} pnt</div>
                </div>
            `;
        })
        .join('');
}

// ===================================
// Utility Functions
// ===================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
    });
}

function updateLastUpdated() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    elements.updateTime.textContent = `${hours}:${minutes}`;
}
