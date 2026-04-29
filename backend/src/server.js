import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8080);
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

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

app.listen(port, () => {
  console.log(`portfolio-backend listening on :${port}`);
});
