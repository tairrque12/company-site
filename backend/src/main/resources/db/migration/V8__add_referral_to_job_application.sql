ALTER TABLE job_application
    ADD COLUMN referred_source VARCHAR(255) NOT NULL DEFAULT 'None';