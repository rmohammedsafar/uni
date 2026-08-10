-- ==========================================================================
-- UNIVERSITY OF EAST FLORIDA - RELATIONAL SQL DATABASE SCHEMA
-- Compatible with PostgreSQL, MySQL, MariaDB, and Supabase
-- ==========================================================================

-- 1. USERS & STUDENT ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. DEGREE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS student_applications (
    tracking_id VARCHAR(50) PRIMARY KEY,
    user_email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100),
    program_id VARCHAR(100) NOT NULL,
    program_title VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    tuition VARCHAR(50),
    raw_fee NUMERIC(10, 2),
    referral_code VARCHAR(50),
    discount_percent NUMERIC(5, 2) DEFAULT 0.00,
    discount_amount NUMERIC(10, 2) DEFAULT 0.00,
    final_fee_numeric NUMERIC(10, 2),
    final_fee_display VARCHAR(50),
    previous_school VARCHAR(255),
    submitted_at VARCHAR(100),
    status VARCHAR(50) DEFAULT 'APPLICATION UNDER REVIEW'
);

-- 3. UPLOADED MARKSHEETS & TRANSCRIPTS TABLE
CREATE TABLE IF NOT EXISTS uploaded_marksheets (
    marksheet_id SERIAL PRIMARY KEY,
    tracking_id VARCHAR(50) REFERENCES student_applications(tracking_id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size VARCHAR(50),
    file_type VARCHAR(50) DEFAULT 'Document',
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BROCHURE DOWNLOAD LEADS TABLE
CREATE TABLE IF NOT EXISTS brochure_downloads (
    lead_id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    program_id VARCHAR(100) NOT NULL,
    program_title VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    downloaded_at VARCHAR(100),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_apps_email ON student_applications(user_email);
CREATE INDEX IF NOT EXISTS idx_apps_status ON student_applications(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON brochure_downloads(student_email);

-- SEED DATA: REGISTRAR ADMIN ACCOUNTS
INSERT INTO users (user_id, full_name, email, phone, role)
VALUES ('admin-001', 'Registrar Administrator', 'r.mohammedsafar@gmail.com', '+1 (800) 555-8331', 'admin')
ON CONFLICT (email) DO NOTHING;
