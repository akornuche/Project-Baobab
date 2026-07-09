# Database Setup Instructions

## Prerequisites

You need PostgreSQL 14+ installed and running on your local machine.

### Windows Installation

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Set a password for the postgres user (remember this!)
   - Keep the default port (5432)
   - Install pgAdmin (optional but recommended)

4. Create the baobab database:
   - Open pgAdmin or psql
   - Run: `CREATE DATABASE baobab;`

### Linux Installation (Ubuntu)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createuser -s postgres
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres createdb baobab
```

## Configuration

1. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and update the DATABASE_URL:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/baobab?schema=public"
   ```

3. Make sure `.env` file exists:
   ```bash
   echo "DATABASE_URL=\"postgresql://postgres:YOUR_PASSWORD@localhost:5432/baobab?schema=public\"" > .env
   ```

## Running Migrations

```bash
# Install dependencies if needed
npm install

# Generate Prisma client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init
```

## Running Seed Script

```bash
# Seed initial taxonomy data (domains, subdomains, etc.)
npx prisma db seed
```

## Verifying the Setup

```bash
# Open Prisma Studio to view data
npx prisma studio

# Or use psql
psql -U postgres -d baobab -c "SELECT * FROM domain;"
```

## Troubleshooting

### Error: "Can't reach database server"
- Make sure PostgreSQL service is running
- Check that the password in DATABASE_URL is correct
- Verify PostgreSQL is listening on port 5432

### Error: "Database does not exist"
- Create the database: `createdb baobab`
- Or connect to postgres database and run: `CREATE DATABASE baobab;`

### Error: "Permission denied"
- Ensure the postgres user has permissions on the database
- Run: `GRANT ALL PRIVILEGES ON DATABASE baobab TO postgres;`

## Database Schema

The schema includes:
- **User**: System users (admin, editors, reviewers)
- **Domain**: Top-level categories (Government, Business, Education)
- **Subdomain**: Subcategories (Business Registration, Identity, etc.)
- **Guide**: Content pages with structured content blocks
- **Tool**: Calculator components attached to guides
- **DirectoryListing**: Business/service directory entries
- **GuideSource**: Verified sources for guides
- **Review**: Human verification workflow