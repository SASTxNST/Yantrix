- Fork repo
- Create branch
- Use docker setup
- Follow code style
- Open PR

# Docker Documentation

## Start full project

```bash
npm run docker:up
```

or directly:

```bash
docker compose up -d --build
```

## Stop project

```bash
npm run docker:down
```

or:

```bash
docker compose down
```

## View running containers

```bash
docker compose ps
```

## View all logs

```bash
docker compose logs -f
```

## View backend logs only

```bash
docker compose logs -f backend
```

## View frontend logs only

```bash
docker compose logs -f frontend
```

## View database logs only

```bash
docker compose logs -f postgres
```

## Restart all services

```bash
docker compose restart
```

## Restart backend only

```bash
docker compose restart backend
```

## Restart frontend only

```bash
docker compose restart frontend
```

## Rebuild everything from scratch

```bash
docker compose down
docker compose up --build
```

## Rebuild without cache

```bash
docker compose build --no-cache
docker compose up
```

## Run Prisma migration

```bash
docker compose exec backend npx prisma migrate dev
```

## Create a named Prisma migration

```bash
docker compose exec backend npx prisma migrate dev --name migration_name
```

## Apply existing migrations

```bash
docker compose exec backend npx prisma migrate deploy
```

## Check migration status

```bash
docker compose exec backend npx prisma migrate status
```

## Generate Prisma client

```bash
docker compose exec backend npx prisma generate
```

## Open Prisma Studio

```bash
docker compose exec backend npx prisma studio
```

## Enter backend container shell

```bash
docker compose exec backend sh
```

## Enter frontend container shell

```bash
docker compose exec frontend sh
```

## Enter Postgres container shell

```bash
docker compose exec postgres sh
```

## Open Postgres CLI

```bash
docker compose exec postgres psql -U postgres -d space_platform
```

## List database tables

```bash
docker compose exec postgres psql -U postgres -d space_platform -c "\dt"
```

## Check backend env variable

```bash
docker compose exec backend printenv DATABASE_URL
```

## Check Cloudinary env variable

```bash
docker compose exec backend printenv CLOUDINARY_CLOUD_NAME
```

## Check frontend env variable

```bash
docker compose exec frontend printenv VITE_API_BASE_URL
```

## Test backend health route

```bash
curl http://localhost:8000/health
```

## Test frontend

Open:

```txt
http://localhost:5173
```

## Test backend API

```bash
curl http://localhost:8000/api
```

## Test signup API

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9999999999","password":"Test@123"}'
```

## Test login API

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

## Reset database completely

Warning: deletes local Docker database data.

```bash
docker compose down -v
docker compose up -d --build
docker compose exec backend npx prisma migrate deploy
```

## Remove stopped containers/images/cache

```bash
docker system prune
```

## Remove unused build cache

```bash
docker builder prune
```

## Full cleanup

Warning: removes unused containers, images, networks, and cache.

```bash
docker system prune -a
```

## Diagnose container status

```bash
docker compose ps
docker inspect space_platform_backend
docker inspect space_platform_frontend
docker inspect space_platform_postgres
```

## Check if backend sees latest local code

```bash
docker compose exec backend ls /app
docker compose exec backend cat /app/package.json
```

## Check if frontend sees latest local code

```bash
docker compose exec frontend ls /app
docker compose exec frontend cat /app/package.json
```

## Install new backend package inside container

```bash
docker compose exec backend npm install package-name
```

## Install new frontend package inside container

```bash
docker compose exec frontend npm install package-name
```

## Rebuild after package changes

```bash
docker compose up -d --build
```

## Run backend tests

```bash
docker compose exec backend npm test
```

## Run frontend tests

```bash
docker compose exec frontend npm test
```

## Common fix: backend says table does not exist

```bash
docker compose exec backend npx prisma migrate deploy
docker compose restart backend
```

## Common fix: invalid token

Clear browser local storage, then signup/login again.

## Common fix: env not loading

```bash
docker compose exec backend printenv
docker compose exec frontend printenv
```

## Common fix: containers stuck

```bash
docker compose down
docker compose up -d --build
```

## Common fix: database broken locally

```bash
docker compose down -v
docker compose up -d --build
docker compose exec backend npx prisma migrate deploy
```
