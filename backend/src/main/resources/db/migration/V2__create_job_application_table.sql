/*THIS IS THE FORM FOR FILLING OUT A JOB APPLICATION*/
CREATE TABLE job_application(
    id BIGSERIAL PRIMARY KEY,
    job_posting_id BIGINT NOT NULL REFERENCES job_posting(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    preferred_first_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(150) NOT NULL,
    resume_path VARCHAR(500) NOT NULL,
    linkedin_url VARCHAR(500),
    website_url VARCHAR(500),
    submitted_at TIMESTAMP NOT NULL DEFAULT now()
);