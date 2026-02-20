# Supabase backups to S3

This repo holds a small setup to back up a Supabase database as CSV files and store them on S3.

## What it does

Every night a GitHub Actions workflow:

1. Connects to Supabase with a service role key.
2. Exports each table as CSV.
3. Puts all CSVs in a timestamped folder.
4. Zips that folder and uploads the ZIP to S3.

## Tech stack

- Supabase (PostgreSQL) + `@supabase/supabase-js`
- GitHub Actions
- AWS S3 for storage

## Setup

Add these GitHub secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `S3_BUCKET_NAME`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

Export logic is in `export_to_csv.mjs`, the scheduled job in `.github/workflows/backup.yml`.
