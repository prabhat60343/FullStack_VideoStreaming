import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = file.fieldname + "-" + uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Video Streaming API" });
});

app.post('/upload', upload.single('file'), (req, res) => {
    const lessonId = uuidv4();
    const videoPath = req.file.path;
    const outputDir = path.join(uploadPath, 'courses', lessonId);
    const hlsPath = path.join(outputDir, 'index.m3u8');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputDir}/segment-%03d.ts" -start_number 0 "${hlsPath}"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`FFmpeg error: ${error.message}`);
            return res.status(500).json({ message: "Video processing failed" });
        }

        const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
        res.json({
            message: "Video uploaded and converted to HLS format successfully",
            videoUrl,
            lessonId
        });
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


/*app.get("/videos", (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read upload directory" });
        }

        // Filter video files only (optional)
        const videoFiles = files.filter(file => file.endsWith(".mp4"));

        res.json({
            count: videoFiles.length,
            videos: videoFiles.map(filename => ({
                filename,
                url: `http://localhost:8000/video/${filename}`
            }))
        });
    });
});

app.get("/video/:filename", (req, res) => {
    const filePath = path.join(uploadPath, req.params.filename);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send("File not found");
        }

        const range = req.headers.range;
        const fileSize = stats.size;

        if (!range) {
            // 👇 Fallback: Serve entire file if no Range header (not recommended for big files)
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4"
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }

        // Parse range (e.g., "bytes=0-")
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;

        const stream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4"
        });

        stream.pipe(res);
    });
});
*/