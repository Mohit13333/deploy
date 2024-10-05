import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import Routes from './Routes/Routes.js';
import Main from "./db/db.js"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname('dist');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('default'));

// Serve static files
app.use(express.static(path.join(_dirname, process.env.PUBLIC_DIR)));

// API routes
app.use('/api', Routes);

// Serve index.html
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, 'dist', 'index.html'));
});

// Start server
app.listen(process.env.PORT, () => {
  console.log('Server is running at http://localhost:8000');
});
//browser supports only get request
