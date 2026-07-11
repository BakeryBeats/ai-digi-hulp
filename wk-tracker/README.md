# ⚽ WK Tracker - World Cup Live Statistics

Een moderne, real-time voetbaltracker voor het Wereldkampioenschap 2026.

## 🎯 Features

✅ **Live Scores** - Volg alle wedstrijden real-time  
✅ **Poule Standen** - Bekijk de actuele klassementen per groep  
✅ **Speler Statistieken** - Top scorers, assists, gele kaarten  
✅ **Fantasy League** - Maak je eigen team en speel tegen vrienden  
✅ **Responsief Design** - Werkt op desktop, tablet en mobiel  
✅ **Dark Theme** - Ogen-vriendelijk dark mode design  

## 🚀 Technologie

- **HTML5** - Semantische structuur
- **CSS3** - Modern design met gradients en animaties
- **Vanilla JavaScript** - Geen frameworks nodig
- **Responsive Grid** - Flexibele layouts

## 📋 Geplande Functies

- [ ] Integratie met echte voetbal API (API-FOOTBALL, ESPN)
- [ ] Push notificaties voor goal alerts
- [ ] Gebruiker authenticatie & teams opslaan
- [ ] Weddenschap simulator
- [ ] Social sharing features
- [ ] Video highlights integratie
- [ ] PWA support (offline mode)

## 🔗 API Integratie

Huidige versie gebruikt **mock data**. Om echte data te gebruiken:

1. **API-FOOTBALL** (RapidAPI)
   ```bash
   npm install axios
   ```
   Update `api-data.js` met je API key

2. **ESPN API**
   - Gratis, geen key nodig
   - Update `fetchFromRealAPI()` in `api-data.js`

## 💻 Installatie

```bash
# Clone repository
git clone https://github.com/BakeryBeats/ai-digi-hulp.git
cd ai-digi-hulp/wk-tracker

# Open in browser
open index.html
# of
python -m http.server 8000  # Python 3
# of
npx http-server  # Node.js
```

## 📁 Structuur

```
wk-tracker/
├── index.html       # Main HTML
├── style.css        # Styling
├── script.js        # Main logic
├── api-data.js      # Data & API calls
└── README.md        # Dit bestand
```

## 🎮 Gebruik

1. **Bekijk Wedstrijden** - Navigeer naar "Wedstrijden" voor live scores
2. **Check Standen** - Selecteer een poule om klassementen te zien
3. **Stats** - Zie top scorers, keepers en andere statistieken
4. **Fantasy** - Klik "Maak Team" om mee te doen aan de fantasy league

## 🌐 Live Demo

```
https://bakerybeats.github.io/ai-digi-hulp/wk-tracker/
```

## 🤝 Contributing

Wil je bijdragen? Maak een pull request!

## 📄 Licentie

MIT License - Vrij te gebruiken en aan te passen

## 👨‍💻 Contact

Vragen of suggesties? Neem contact op!
