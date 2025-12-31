### Screen Sharing Meeting App – WebRTC

This app allows users to join a meeting using a Meeting ID, share their screen, toggle microphone, send reactions, and leave the meeting — all without any backend or signaling server.

## 🛠️ Technology Stack

- React.js – Frontend
- WebRTC (MediaDevices API) – Screen sharing & microphone access
- Material UI Icons – Controls & reactions
- CSS – Layout & styling

## 📌 Features
⭐ Frontend (React + WebRTC)
- Join meeting using Meeting ID
- Screen sharing using getDisplayMedia
- Microphone on/off toggle using getUserMedia
- Avatar shown when screen sharing is off
- Live video preview of shared screen
- Reactions during meeting (Like, Clap, Heart)
- Leave meeting functionality
- Clean and minimal meeting UI
- No backend / No signaling server required

## ⚙️ Installation & Setup

1. Clone the Repository

   ```bash
   git clone https://github.com/Thamizhjaisankar-git/WebRTC.git
   cd screen-share

2. 🌐 Frontend Setup (React + Tailwind)
   ```bash
    npm install
    npm run dev


## 🧠 How It Works (Technical Overview)

- Screen Sharing
- Uses navigator.mediaDevices.getDisplayMedia()
- Captures screen video and system audio
- Microphone Control
- Uses navigator.mediaDevices.getUserMedia()
- Dynamically merges audio track with screen video
- Media Handling
- Media streams are assigned directly to <video> and <audio> elements
- Reactions
- Controlled using React state
- Icons rendered temporarily on screen
- Meeting Exit
- Stops all media tracks and reloads the app

This project does not include real-time peer-to-peer communication or multi-user meetings.
It focuses on single-user screen sharing simulation using WebRTC APIs.

## 🚀 Future Enhancements

- Real-time multi-user meetings (WebRTC + signaling server)
- WebSocket or Socket.IO integration
- Camera on/off support
- Chat messaging during meetings
- Recording screen sessions
- Full Teams / Google Meet–style UI
- Mobile & tablet support

## 📬 Connect with Me

- 💼 [LinkedIn](https://www.linkedin.com/in/thamizhjaisankar)  
- 🌐 [Portfolio](https://thamizh-jl.vercel.app/)  
- ✉️ [Email Me](mailto:thamizhjaisankar@gmail.com)
