# llisto-supabase-backups
Automated backup pipeline for **Llisto**: GitHub Actions runs nightly `pg_dump` on the Supabase Postgres database and stores compressed backups securely on Amazon S3, providing reliable, versioned, and easily restorable data.
