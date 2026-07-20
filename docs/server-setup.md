# VPS setup guide

## Stack

| Layer | Choice |
|-------|--------|
| VPS | Hetzner 2 vCPU / 4 GB / 40 GB |
| Reverse proxy | Caddy (auto HTTPS) |
| Apps | Docker Compose (one compose per app) |
| DB | 1× PostgreSQL (many DBs) |
| Cache | 1× Redis (shared) |
| CI/CD | GitHub Actions → pull image (later) |

**Domains**
```
datasolutionbd.com          → company-website (Next.js)
edu.datasolutionbd.com      → edu-saas frontend
api.edu.datasolutionbd.com  → edu-saas Go API
pharmacy.datasolutionbd.com → KEEP on old Hostinger IP (do not change)
```

---

## Step 1 — Initial VPS setup ✅

```bash
apt update && apt upgrade -y
adduser deploy
usermod -aG sudo deploy
# copy SSH key to deploy, install Docker, ufw 22/80/443
mkdir -p /srv/{proxy,company-website,edu-saas,postgres,redis,backups}
chown -R deploy:deploy /srv
docker network create web
```

DNS (Cloudflare): `@` and `*` → `49.13.224.61` (grey cloud). Leave `pharmacy` alone. Delete old AAAA on root if present.

---

## Step 2 — Caddy ✅

`/srv/proxy/Caddyfile` + `docker-compose.yml` on network `web`.  
502 until app is up = expected.

---

## Step 3 — Deploy company-website

### 3.1 On your Mac — commit & push Docker files

Repo already has:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `next.config.mjs` with `output: "standalone"`

Push to GitHub if not already.

### 3.2 On VPS — add swap (4 GB box needs this for Next build)

As `deploy` (or root with sudo):

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

### 3.3 Clone repo into /srv/company-website

```bash
ssh deploy@49.13.224.61

# If folder is empty:
cd /srv
rmdir company-website 2>/dev/null || true
git clone YOUR_GITHUB_REPO_URL company-website
cd /srv/company-website
```

If you already have files in `/srv/company-website`, clone into a temp dir and move, or:

```bash
cd /srv/company-website
git init
git remote add origin YOUR_GITHUB_REPO_URL
git fetch origin
git checkout -f main   # or master
```

### 3.4 Create `.env` on server

```bash
cd /srv/company-website
nano .env
```

Paste (fill real SMTP values from Hostinger / `.env.local`):

```env
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your-smtp-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your@email.com
MAIL_FROM_NAME=Data Solution BD Contact
CONTACT_TO_EMAIL=nahid.dev19@gmail.com
```

### 3.5 Build & run

```bash
cd /srv/company-website
docker compose build
docker compose up -d
docker compose logs -f
```

Ctrl+C to stop following logs.

### 3.6 Verify

```bash
docker ps | grep company-website
curl -I https://datasolutionbd.com
```

Expect **200** (or 307 redirect), not 502.

Browser: open https://datasolutionbd.com

### 3.7 Redeploy later (manual)

```bash
cd /srv/company-website
git pull
docker compose build
docker compose up -d
```

---

## Next steps

| Step | Topic |
|------|-------|
| **4** | Shared PostgreSQL + Redis |
| **5** | Deploy edu-saas |
| **6** | GitHub Actions (build image off-VPS) |
| **7** | Backups + monitoring |

---

## Rules

1. Use `deploy` user daily, not root
2. One Postgres, many DBs — not one Postgres per SaaS
3. `mem_limit` on every container
4. Company site needs Node runtime (nodemailer) — standalone Docker is correct
5. Caddy service name must match container/service: `company-website`
