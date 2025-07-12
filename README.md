# FullStack Video Streaming Web Application

A fullstack web application for uploading, converting, and streaming video content using HLS (HTTP Live Streaming). Built with Express.js (backend) and React + Vite (frontend).

---

## Features

- **Video Upload:** Upload video files via the frontend.
- **Automatic HLS Conversion:** Uploaded videos are converted to HLS format using FFmpeg.
- **Video Streaming:** Stream videos in HLS format directly in the browser.
- **Responsive Video Player:** Uses Video.js for a modern, responsive video player.
- **REST API:** Simple endpoints for uploading and accessing videos.

---

## Tech Stack

- **Backend:** Node.js, Express.js, Multer, FFmpeg, UUID
- **Frontend:** React 19, Vite, Video.js
- **Other:** CORS, Nodemon (dev), HLS (HTTP Live Streaming)

---

## Folder Structure

```
FullStack_VideoStreaming/
│
├── index.js                # Express backend server
├── package.json            # Backend dependencies & scripts
├── frontend/               # React frontend
│   ├── src/                # React source files
│   ├── package.json        # Frontend dependencies & scripts
│   ├── vite.config.js      # Vite config
│   └── ...                 # Other frontend files
├── uploads/                # Uploaded and processed videos (auto-created)
├── README.md               # This file
└── ...
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **FFmpeg** installed and available in your system PATH
- **npm** (comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FullStack_VideoStreaming
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start the Backend Server

```bash
npm start
```
- Runs Express server on `http://localhost:8000`

### 5. Start the Frontend Development Server

```bash
npm run dev
```
- Runs React/Vite frontend on `http://localhost:5173`

---

## Usage

1. Open the frontend in your browser (`http://localhost:5173`).
2. Upload a video file using the provided UI.
3. The backend converts the video to HLS format and returns a streaming URL.
4. The video player streams the video using HLS.

---

## API Endpoints

- `GET /`  
  Returns a welcome message.

- `POST /upload`  
  Upload a video file (`multipart/form-data`, field name: `file`).  
  Converts to HLS and returns the streaming URL.

- `GET /uploads/courses/:lessonId/index.m3u8`  
  HLS playlist for streaming.

---

## Notes

- **FFmpeg** must be installed for video conversion.
- Uploaded videos and HLS segments are stored in `/uploads/courses/<lessonId>/`.
- CORS is enabled for local frontend development.

---

## License

ISC

---

## Author

- [Your Name or Team]

---

## Troubleshooting

- If video conversion fails, ensure FFmpeg is installed and accessible.
- Check backend logs for errors.
- Make sure ports `8000` (backend) and `5173` (frontend) are not blocked.

---

## Contributing

Pull requests and issues are welcome!

