# Media Discord Bot

Dies ist ein moderner Discord-Bot für Moderation, Support, Logging, Tickets, Verifizierung und viele weitere Features – perfekt für deinen Community-Server.

---

## Features

- **Embed System**
- **Cleane Config**
- **Emojis**

---

## Installation

### Voraussetzungen

- Node.js **v18** oder neuer
- Einen Discord Bot-Account (Token)  
  [Bot erstellen & Token generieren → Discord Developer Portal](https://discord.com/developers/applications)

### 1. Bot clonen

```bash
git clone https://github.com/6nte/simple-media-bot.git
cd simple-media-bot
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Konfiguration

Bearbeite die Datei **`config.json`** und trage deine Werte ein:

- `token`: **Bot Token** aus dem Discord Developer Portal
- `clientId`: Die Client-ID deines Bots
- `guildId`: Die Server-ID, auf dem der Bot genutzt wird
- `adminRoleId`: Die ID der Admin-Rolle, die Befehle wie `/ban` & `/setup_supportnotify` ausführen darf
- Weitere Channel-, Rollen- und Log-IDs (je nach Feature)

**Beispiel:**
```json
{
  "token": "DEIN_DISCORD_BOT_TOKEN",
  "clientId": "BOT_CLIENT_ID",
  "guildId": "SERVER_ID",
  "adminRoleId": "ADMIN_ROLE_ID",
  ...
}
```

> **Tipp:** IDs findest du in Discord mit Entwickler-Modus (Rechtsklick auf Rolle/Channel → ID kopieren).

---

## Starten des Bots

```bash
node index.js
```

Der Bot sollte nun online gehen und die Konsole zeigt "Ready! Logged in as ...".


## Fehlerbehebung

- Prüfe, ob dein Bot die richtigen Berechtigungen und Intents hat.
- Konfiguration (`config.json`) muss gültig und vollständig sein.
- Für Support: [Discord Support](https://discord.gg/hopeleakz) oder Issues im Repo erstellen.

---

## Credits

- Bot von @entezx & @affezx  
- Template und Weiterentwicklung: [Hopeleaks](https://discord.gg/hope-leaks)
- **Bitte Credits erhalten, wenn du diesen Bot benutzt!**

---

Viel Spaß mit den Bot!
