import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();
const port = Number(process.env.PORT || 8080);
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Security middleware
app.use(helmet());
app.use(cors({ origin: frontendOrigin }));

// Rate limiting middleware
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs for auth routes
  message: 'Too many auth attempts, please try again later.',
  skip: (req) => req.method !== 'POST', // Only limit POST requests
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Request validation and sanitization
const validateAndSanitize = (req, res, next) => {
  // Check payload size
  const maxPayloadSize = 1024 * 100; // 100KB max
  let dataSize = 0;

  req.on('data', (chunk) => {
    dataSize += chunk.length;
    if (dataSize > maxPayloadSize) {
      res.status(413).json({ ok: false, error: 'Payload too large' });
      req.destroy();
    }
  });

  next();
};

app.use(express.json({ limit: '100kb' }));
app.use(validateAndSanitize);

const projects = [
  {
    id: 'spotify-album-finder',
    title: 'Spotify Album Finder',
    dateRange: '2025 - Present',
    description:
      'Developed a web application to search for Spotify albums and retrieve detailed track information using the Spotify API. Implemented secure user authentication with JWT and a Node.js backend, with React.js + Vite on the frontend.',
    tags: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'Vite', 'CSS', 'JWT'],
  },
  {
    id: 'discord-bot',
    title: 'Discord Bot',
    dateRange: '2018 - 2020',
    description:
      'Created a Discord bot to enhance server interactivity and provide automated features. Integrated multiple APIs to fetch dynamic content and handled hosting/performance optimization.',
    tags: ['JavaScript', 'Discord.js', 'API Integration'],
  },
  {
    id: 'prototype-games',
    title: 'Prototype Games',
    dateRange: '2023 - Present',
    description:
      'Developed 2D and 3D prototype games in Unity and Unreal Engine, focusing on gameplay mechanics, physics, UI, and iterative testing.',
    tags: ['Unity (C#)', 'Unreal Engine'],
  },
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-backend', timestamp: new Date().toISOString() });
});

app.get('/api/projects', (_req, res) => {
  res.json({ ok: true, projects });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`portfolio-backend listening on :${port}`);
});
