# Yantrix

Yantrix is a next-generation space-tech collaboration platform — built specifically for **space datasets, satellite challenges, AI/ML experimentation, research collaboration, and engineering innovation**.

This repository contains the full-stack Yantrix development environment:

- **Frontend** → React + Vite + TypeScript
- **Backend** → Node.js + TypeScript + Express
- **Database** → PostgreSQL + Prisma ORM
- **DevOps** → Docker + Docker Compose
- **Developer CLI** → Orbit CLI

---

# Quick Start for first time Yantrix contributers

```bash
git clone <repo-url>
cd Yantrix
npm install
cp .env.example .env
npx orbit start
```

This will:

- Build Docker containers
- Start frontend, backend, and PostgreSQL
- Apply required migrations
- Open frontend automatically
- Launch interactive Orbit shell

Stop project:

```bash
npx orbit stop
```

---

# Orbit Interactive Shell

After running:

```bash
npx orbit start
```

You will enter:

```txt
orbit>
```

Available commands inside shell:

```txt
stop_orbit
logs
logs backend
logs frontend
logs postgres
status
open
restart
migrate
deploy_migrate
studio
db
help
exit
```

- `stop_orbit` → shuts down frontend, backend, and database containers
- `exit` → exits shell only, containers keep running

---

# URLs

Frontend: http://localhost:5173  
Backend: http://localhost:8000  
API: http://localhost:8000/api

---

# Orbit CLI Commands

```bash
npx orbit start
npx orbit stop
npx orbit restart
npx orbit status
npx orbit logs
npx orbit logs backend
npx orbit logs frontend
npx orbit logs postgres
npx orbit migrate
npx orbit migrate init
npx orbit migrate:deploy
npx orbit migrate:status
npx orbit generate
npx orbit studio
npx orbit db
npx orbit shell backend
npx orbit shell frontend
npx orbit shell db
npx orbit reset
npx orbit open
npx orbit health
```

---

# Why Orbit CLI?

Orbit was created to improve contributor experience.

Instead of remembering long Docker commands like:

```bash
docker compose up -d --build
docker compose logs -f backend
docker compose exec backend npx prisma migrate dev
```

Use:

```bash
npx orbit start
npx orbit logs backend
npx orbit migrate
```

Cleaner, faster, and contributor-friendly.

---

# Project Structure

```text
Yantrix/
├── frontend/
├── backend/
├── scripts/
│   └── orbit.js
├── docker-compose.yml
├── package.json
├── .env.example
└── README.md
```

---

# License

MIT

# Yantrix by SAST