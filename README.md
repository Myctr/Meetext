# Meetext

Meetext is a privacy-focused peer-to-peer meeting workspace for video calls, live chat, meeting history, and participant controls. It combines WebRTC media, PeerJS data channels, and an Express/SQLite backend for authentication and meeting records.

## Features

- Peer-to-peer audio and video meetings with camera and microphone controls
- Meeting approval flow for hosts and synchronized participant presence
- Real-time text chat with image and document attachments
- Attachment limits: up to 3 files per message and 2 MB per file
- SQLite-backed authentication, sessions, rooms, and meeting messages
- Password hashing with `bcryptjs`
- Profile editing with avatar support
- Turkish and English language selection
- Persistent light and dark themes
- Responsive dashboard and meeting layouts

## Tech Stack

- React 19 and React Router
- Express and SQLite
- PeerJS and WebRTC
- Axios and React Hot Toast
- Create React App

## Project Structure

```text
Meetext/
├── Server/       Express API and SQLite database access
├── src/          React application and meeting components
├── public/       Static application files
└── Database/     SQL resources and database files
```

## Getting Started

### Frontend

```bash
npm install
npm start
```

The frontend runs on `http://localhost:3000` by default.

### Server

```bash
cd Server
npm install
node index.js
```

The API runs on port `3001` by default. The server supports these environment variables:

- `PORT`: API port
- `CORS_ORIGINS`: comma-separated frontend origins
- `MEETEXT_DB_PATH`: optional path for the SQLite database

## GitHub Metadata Suggestions

### Recommended project name

`Meetext`

### Recommended description

`A privacy-focused peer-to-peer meeting workspace with video calls, live chat, profiles, and SQLite-backed meeting history.`

### Recommended topics

`react`, `express`, `sqlite`, `peerjs`, `webrtc`, `video-conferencing`, `peer-to-peer`, `real-time-chat`, `meeting-app`, `javascript`

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
